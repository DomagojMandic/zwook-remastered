import { useForm } from "react-hook-form";
import FormBase, { FormRow } from "../../features/MediaForms/FormBase";
import { USER_SETTINGS_CONFIG } from "../../data/userSettingsConfig";
import FormInput from "../../ui/SimpleComponents/FormInput";
import FormTextarea from "../../ui/SimpleComponents/FormTextarea";
import FormUploadMedia from "../../ui/SimpleComponents/FormUploadMedia";
import FormLabel from "../../ui/SimpleComponents/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import SaveButton from "../../ui/Buttons/SaveButton";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";
import ImageUpload from "../../ui/SimpleComponents/FormUploadCoverImg";
import { editFileName } from "../../helpers/helpers";
import { updateUserProfileThunk } from "../../redux-slices/userReducer";
import toast from "react-hot-toast";

/* This will later be seperated into editable and non editable fields */
function renderField(field, user, register, control, editing) {
  const value = field.format
    ? field.format(user[field.name])
    : user[field.name];

  return (
    <FormRow key={field.name} $area={field.name}>
      <FormLabel>{field.label}</FormLabel>
      {field.type === "text" && (
        <FormInput
          {...register(field.name, field.validation)}
          defaultValue={value}
          placeholder={field.placeholder}
          type={field.type}
          id={field.name}
          disabled={!field.editable || !editing}
        />
      )}
      {/* Later for adding profile descriptions */}
      {field.type === "textarea" && (
        <FormTextarea
          {...register(field.name, field?.validation)}
          defaultValue={value}
          placeholder={field.placeholder}
          id={field.name}
          disabled={!field.editable || !editing}
        />
      )}
      {/* Will be used for profile cover images */}
      {field.type === "file" && (
        <FormUploadMedia
          id={field.name}
          {...register(field.name, field.validation)}
          value={value}
          fileType={field.fileType || "image"}
          accept={field.accept}
        />
      )}
      {field.type === "image" && (
        <>
          {/* Hidden field so the cover url can be registered in the form */}
          <input {...register(field.name)} type="hidden" defaultValue={value} />
          <ImageUpload
            name={field.name}
            control={control}
            rules={field.validation}
            defaultValue={value}
            placeholder={field.placeholder}
            disabled={!field.editable || !editing}
          />
        </>
      )}
      {field.type === "subscription-status" && (
        <FormInput
          {...register(field.name, field.validation)}
          defaultValue={value}
          placeholder={field.placeholder}
          id={field.name}
          disabled={!field.editable || !editing}
        />
      )}
    </FormRow>
  );
}

function Settings() {
  const { user, isUpdatingUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState(user);
  const { register, handleSubmit, reset, control } = useForm();
  const [editing, setEditing] = useState(false);

  function handleEditing(e) {
    e.preventDefault();
    if (editing) {
      // The following object represents the formatted user data upon exiting (cancelling)
      // the edit mode
      const formattedData = {};
      USER_SETTINGS_CONFIG.sections.forEach((section) => {
        section.fields.forEach((field) => {
          formattedData[field.name] = field.format
            ? field.format(initialData[field.name])
            : initialData[field.name];
        });
      });
      reset(formattedData);
    } else {
      // EDIT
      setInitialData(user);
    }
    setEditing(!editing);
  }

  async function onSubmit(data) {
    try {
      // Currently, only 3 properties are available for changing so we are preparing them
      const formattedData = {
        cover_url: data.cover_url, // url of the current image that will later be used for deleting the image
        HasNewImage: data.HasNewImage,
        displayName: data?.display_name,
        fullName: data?.full_name,
      };

      if (data.HasNewImage) {
        // Handle new image upload
        const fileName = `${
          data.File ? data.File.lastModified + data.File.name : ""
        }`;
        const formattedFileName = editFileName(fileName);
        formattedData.fileName = formattedFileName;
        formattedData.file = data.File;
      }

      console.log(formattedData);

      // Dispatch the Redux thunk
      const result = await dispatch(
        updateUserProfileThunk({
          userId: user.user_id,
          userData: formattedData,
        })
      ).unwrap(); // unwrap() to handle promise rejection

      // On Success: Show success toast
      toast.success("Profile updated successfully!");

      // Exit edit mode after successful update
      setEditing(false);

      // Update initial data with new values for future cancellations
      setInitialData(result);
    } catch (error) {
      toast.error(`Error updating profile: ${error}`);
    }
  }

  return (
    <FormBase
      onSubmit={handleSubmit(onSubmit)}
      $gridColumnAreas={USER_SETTINGS_CONFIG.ui.gridTemplateAreas}
      $gridColumnAreasResponsive={USER_SETTINGS_CONFIG.ui.gridTemplateAreasResp}
    >
      <FormRow $area="edit">
        <FeaturedButton
          onClick={(e) => handleEditing(e)}
          disabled={isUpdatingUser}
        >
          {editing ? "Cancel" : "Edit"}
        </FeaturedButton>
      </FormRow>

      <FormRow $area="save">
        {editing && (
          <SaveButton disabled={isUpdatingUser}>
            {isUpdatingUser ? "Saving..." : "Save Changes"}
          </SaveButton>
        )}
      </FormRow>

      {USER_SETTINGS_CONFIG.sections.map((section) => (
        <>
          <FormRow key={`${section.title}-title`} $area={section.gridArea}>
            <h2>{section.title}</h2>
          </FormRow>
          {section.fields.map((field) =>
            renderField(field, user, register, control, editing)
          )}
        </>
      ))}
    </FormBase>
  );
}

export default Settings;
