import { useParams } from "react-router";
import ContentHeader from "../../ui/ContentHeader/ContentHeader";
import CreateAlbum from "./CreateAlbum";
import CreateArtist from "./CreateArtist";
import CreateSong from "./CreateSong";

const formMap = {
  artist: CreateArtist,
  album: CreateAlbum,
  song: CreateSong,
};

function MediaForm() {
  const { type } = useParams();

  console.log(type);

  const allowedTypes = ["artist", "album", "song"];
  if (!allowedTypes.includes(type)) {
    throw new Error(`Invalid media type: ${type}`);
  }

  // Render the form based on the type
  const FormComponent = formMap[type];

  return (
    <>
      <ContentHeader
        title={`Create ${
          type === "artist" || type === "album" ? "an" : "a"
        } ${type}`}
        showSaveButton={false}
      />
      <FormComponent />
    </>
  );
}

export default MediaForm;
