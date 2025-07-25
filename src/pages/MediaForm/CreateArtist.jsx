import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";

import FormBase, {
  FormRow,
  UploadRow,
} from "../../features/MediaForms/FormBase";
import FormInput from "../../ui/SimpleComponents/FormInput";
import FormLabel from "../../ui/SimpleComponents/FormLabel";
import FormTextarea from "../../ui/SimpleComponents/FormTextarea";
import FormUploadMedia from "../../ui/SimpleComponents/FormUploadMedia";
import SaveButton from "../../ui/Buttons/SaveButton";

import { dateToISO } from "../../helpers/helpers";
import toast from "react-hot-toast";
import useCreateArtists from "../../hooks/useCreateArtists";

const gridColumnAreas = `"title navigateBtn"
"description description"
"upload upload"
"submit submit"
`;

function CreateArtist() {
  const { createAnArtist, isCreating } = useCreateArtists();
  const navigate = useNavigate();

  function handleNavigate(e) {
    e.preventDefault();
    navigate(`/create/album`);
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onError = (errors) => {
    // Find the first error and toast it
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message, {
        position: "bottom-center",
      });
    }
  };

  const onSubmit = (data) => {
    const formattedData = {
      title: data.artistTitle,
      description: data.description,
      /* The file that we are uploading to the server */
      file: data.file,

      /* 
        This is just the name of the image, not the full path.
        The full path is created in createAlbum fn.
        */

      coverName: `${data.file.lastModified + data.file.name}`,
      type: data.type,
    };

    console.log(formattedData);

    createAnArtist(formattedData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <FormBase
      onSubmit={handleSubmit(onSubmit, onError)}
      $gridColumnAreas={gridColumnAreas}
    >
      <FormRow $area="title">
        <FormLabel htmlFor="artistTitle">Artist Name</FormLabel>
        <FormInput
          id="artistTitle"
          {...register("artistTitle", {
            required: "Artist name is required",
          })}
          placeholder="Enter artist name"
        />
      </FormRow>

      <FormRow $area="navigateBtn">
        <p style={{ fontSize: "1.4rem", color: "var(--text-secondary-500)" }}>
          Already have an artist ?
        </p>
        <SaveButton
          size="medium"
          disabled={isCreating}
          onClick={(e) => handleNavigate(e)}
        >
          Create an album
        </SaveButton>
      </FormRow>
      <FormRow $area="description">
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextarea
          id="description"
          {...register("description", {
            required: "Please add an artist description",
          })}
          placeholder="Enter artist description"
        />
      </FormRow>

      <Controller
        rules={{ required: "Please upload a cover image" }}
        control={control}
        name="file"
        defaultValue={null}
        render={({ field }) => (
          <UploadRow>
            <FormUploadMedia
              id="file"
              value={field.value}
              onChange={(e) => field.onChange(e.target.files[0])}
            />
          </UploadRow>
        )}
      />

      <FormRow $area="submit">
        <SaveButton type="submit" disabled={isCreating}>
          Upload
        </SaveButton>
        <input type="hidden" id="type" value="artist" {...register("type")} />
      </FormRow>
    </FormBase>
  );
}

export default CreateArtist;
