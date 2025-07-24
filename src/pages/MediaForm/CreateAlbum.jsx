import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import FormBase, { FormRow } from "../../features/MediaForms/FormBase";
import FormInput from "../../ui/SimpleComponents/FormInput";
import FormLabel from "../../ui/SimpleComponents/FormLabel";
import FormTextarea from "../../ui/SimpleComponents/FormTextarea";
import EntitySelect from "../../ui/SimpleComponents/FormSelect";
import FormUploadMedia from "../../ui/SimpleComponents/FormUploadMedia";

import {
  StyledDatePicker,
  StyledCalendarWrapper,
} from "../../ui/DatePicker/StyledDatePicker";

import useArtists from "../../hooks/useArtists";
import SaveButton from "../../ui/Buttons/SaveButton";
import useToast from "../../hooks/useToast";
import useCreateAlbums from "../../hooks/useCreateAlbums";
import toast from "react-hot-toast";

function CreateAlbum() {
  const { data: artists } = useArtists();
  const { createAnAlbum } = useCreateAlbums();

  const {
    register,
    handleSubmit,
    control,

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
      release_date: data.releaseDate.toISOString().split("T")[0],
      artist_id: data.artistId.value,
      title: data.albumTitle,
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

    createAnAlbum(formattedData);
  };

  return (
    <FormBase onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow $area="title">
        <FormLabel htmlFor="albumTitle">Album Title</FormLabel>
        <FormInput
          id="albumTitle"
          {...register("albumTitle", {
            required: "Album title is required",
          })}
          placeholder="Enter album title"
        />
      </FormRow>

      {/* Controller for React DatePicker component */}
      <Controller
        rules={{ required: "Album release date is required" }}
        control={control}
        name="releaseDate"
        defaultValue={null}
        render={({ field }) => (
          <FormRow $area="date">
            <FormLabel htmlFor="releaseDate">Release Date</FormLabel>
            <StyledCalendarWrapper>
              <StyledDatePicker
                id="releaseDate"
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                scrollableYearDropdown
                selected={field.value}
                onChange={field.onChange}
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                yearDropdownItemNumber={75}
                placeholderText="YYYY-MM-DD"
              />
            </StyledCalendarWrapper>
          </FormRow>
        )}
      />
      {/* Controller for React-Select Component */}
      <Controller
        rules={{ required: "Select an available artist or create one." }}
        control={control}
        name="artistId"
        defaultValue={null}
        render={({ field }) => (
          <FormRow $area="type">
            <FormLabel htmlFor="artistId">Artist</FormLabel>
            <EntitySelect
              items={artists || []}
              value={field.value}
              onChange={field.onChange}
            />
          </FormRow>
        )}
      />
      <FormRow $area="navigateBtn">
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary-500)" }}>
          Don't have an artist?
        </p>
        <SaveButton size="small">Create one</SaveButton>
      </FormRow>
      <FormRow $area="description">
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextarea
          id="description"
          {...register("description", {
            required: "Please add an album description",
          })}
          placeholder="Enter album description"
        />
      </FormRow>

      <Controller
        rules={{ required: "Please upload a cover image" }}
        control={control}
        name="file"
        defaultValue={null}
        render={({ field }) => (
          <FormRow $area="upload">
            <FormUploadMedia
              id="file"
              value={field.value}
              // To access the File Node, we have to pass the event then take the first element
              onChange={(e) => field.onChange(e.target.files[0])}
            />
          </FormRow>
        )}
      />

      <FormRow $area="submit">
        <SaveButton type="submit">Upload</SaveButton>
        <input type="hidden" id="type" value="album" {...register("type")} />
      </FormRow>
    </FormBase>
  );
}

export default CreateAlbum;
