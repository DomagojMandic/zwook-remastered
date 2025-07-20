import { Link } from "react-router-dom";
import StyledTable from "../ui/Table/StyledTable";
import PlaylistRowItem from "../pages/PlaylistDetails/PlaylistIRowItem";

/**
 *  Function to render each song row in the table - render props
 * @param {object} song
 * @param {number} index
 * @returns HTML element for the song row
 */
export function renderSongsTable(song, index) {
  return (
    <StyledTable.Row
      as={Link}
      to={`/media/${song.type}/${song.id}`}
      key={song.id}
      columns="3rem repeat(4, 1fr)"
    >
      <PlaylistRowItem item={song} index={index} key={song.id} />
    </StyledTable.Row>
  );
}
