import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";

import FormBase, {
  FormRow,
  UploadRow,
} from "../../features/MediaForms/FormBase";
import FormInput from "../../ui/SimpleComponents/FormInput";
import FormLabel from "../../ui/SimpleComponents/FormLabel";
import FormTextarea from "../../ui/SimpleComponents/FormTextarea";
import EntitySelect from "../../ui/SimpleComponents/FormSelect";
import FormUploadMedia from "../../ui/SimpleComponents/FormUploadMedia";

import useArtists from "../../hooks/useArtists";
import SaveButton from "../../ui/Buttons/SaveButton";
import { dateToISO } from "../../helpers/helpers";
import toast from "react-hot-toast";

import useCreateSongs from "../../hooks/useCreateSongs";
import useAlbums from "../../hooks/useAlbums";

const gridColumnAreas = `"title       title"
    "typeArtist         navigateBtnArtist"
    "typeAlbum          navigateBtnAlbum"
    "upload       upload"
    "submit       submit"`;

function CreateSong() {
  const { data: artists } = useArtists();
  const { data: albums } = useAlbums();
  const { createASong, isCreating } = useCreateSongs();
  const navigate = useNavigate();

  function handleNavigate(e, type) {
    e.preventDefault();
    navigate(`/create/${type}`);
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ defaultValues: { type: "song" } });

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
      title: data.songTitle,
      artist_id: data.artistId.value,
      album_id: data.albumId.value,
      duration: data.file.duration,

      /* The file that we are uploading to the server */
      file: data.file,
      /* 
        This is just the name of the image, not the full path.
        The full path is created in createAlbum fn.
        */

      fileName: `${data.file.lastModified + data.file.name}`,
      type: data.type,
    };

    console.log(formattedData);

    createASong(formattedData, {
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
        <FormLabel htmlFor="songTitle">Song Title</FormLabel>
        <FormInput
          id="songTitle"
          {...register("songTitle", {
            required: "Song title is required",
          })}
          placeholder="Enter song title"
        />
      </FormRow>

      {/* Controller for React-Select Component */}
      <Controller
        rules={{ required: "Select an available artist or create one." }}
        control={control}
        name="artistId"
        defaultValue={null}
        render={({ field }) => (
          <FormRow $area="typeArtist">
            <FormLabel htmlFor="artistId">Artist</FormLabel>
            <EntitySelect
              items={artists || []}
              value={field.value}
              onChange={field.onChange}
            />
          </FormRow>
        )}
      />
      <FormRow $area="navigateBtnArtist">
        <p style={{ fontSize: "1.4rem", color: "var(--text-secondary-500)" }}>
          Don't have an artist?
        </p>
        <SaveButton
          size="medium"
          disabled={isCreating}
          onClick={(e) => handleNavigate(e, "artist")}
        >
          Create one
        </SaveButton>
      </FormRow>
      {/* Controller for React-Select Component */}
      <Controller
        rules={{ required: "Select an available album or create one." }}
        control={control}
        name="albumId"
        defaultValue={null}
        render={({ field }) => (
          <FormRow $area="typeAlbum">
            <FormLabel htmlFor="albumId">Album</FormLabel>
            <EntitySelect
              items={albums || []}
              value={field.value}
              onChange={field.onChange}
            />
          </FormRow>
        )}
      />
      <FormRow $area="navigateBtnAlbum">
        <p style={{ fontSize: "1.4rem", color: "var(--text-secondary-500)" }}>
          Don't have an album?
        </p>
        <SaveButton
          size="medium"
          disabled={isCreating}
          onClick={(e) => handleNavigate(e, "album")}
        >
          Create one
        </SaveButton>
      </FormRow>

      <Controller
        rules={{ required: "Please upload a song up to 50MB in size" }}
        control={control}
        name="file"
        defaultValue={null}
        render={({ field }) => (
          <UploadRow>
            <FormUploadMedia
              id="file"
              fileType="audio"
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
        <input type="hidden" id="type" value="song" {...register("type")} />
      </FormRow>
    </FormBase>
  );
}

export default CreateSong;
