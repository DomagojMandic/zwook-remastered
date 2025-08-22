import { useForm } from "react-hook-form";
import FormBase, { FormRow } from "../../features/MediaForms/FormBase";
import { USER_SETTINGS_CONFIG } from "../../data/userSettingsConfig";
import FormInput from "../../ui/SimpleComponents/FormInput";
import FormTextarea from "../../ui/SimpleComponents/FormTextarea";
import FormUploadMedia from "../../ui/SimpleComponents/FormUploadMedia";
import FormLabel from "../../ui/SimpleComponents/FormLabel";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SaveButton from "../../ui/Buttons/SaveButton";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";

/* This will later be seperated into editable and non editable fields */
function renderField(field, user, register, editing) {
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
        <FormInput
          {...register(field.name, field.validation)}
          defaultValue={value}
          placeholder={field.placeholder}
          id={field.name}
          disabled={!field.editable || !editing}
        />
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
  const { user } = useSelector((state) => state.user);
  const [initialData, setInitialData] = useState(user);
  const { register, handleSubmit, reset } = useForm();
  const [editing, setEditing] = useState(false);

  function handleEditing() {
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

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <FormBase
      onSubmit={handleSubmit(onSubmit)}
      $gridColumnAreas={USER_SETTINGS_CONFIG.ui.gridTemplateAreas}
      $gridColumnAreasResponsive={USER_SETTINGS_CONFIG.ui.gridTemplateAreasResp}
    >
      <FormRow $area="edit">
        <FeaturedButton onClick={handleEditing}>
          {editing ? "Cancel" : "Edit"}
        </FeaturedButton>
      </FormRow>

      <FormRow $area="save">
        {editing && <SaveButton>Save Changes</SaveButton>}
      </FormRow>

      {USER_SETTINGS_CONFIG.sections.map((section) => (
        <>
          <FormRow key={`${section.title}-title`} $area={section.gridArea}>
            <h2>{section.title}</h2>
          </FormRow>
          {section.fields.map((field) =>
            renderField(field, user, register, editing)
          )}
        </>
      ))}
    </FormBase>
  );
}

export default Settings;
