import StyledTable from "../../ui/Table/StyledTable";

import mocksong from "../../assets/mock-songs/image-type=Image1.png";
import PlaylistRowItem from "./PlaylistIRowItem";
import { Link } from "react-router-dom";
import { use, useState } from "react";
import FeaturedButton from "../../ui/Buttons/FeaturedButton";

const mockSongs = [
  {
    id: 1,
    title: "Song One",
    artist: "Artist Alpha",
    album: "Album A",
    dateAdded: "2023-01-01",
    songTime: "3:45",
    image: mocksong,
  },
  {
    id: 2,
    title: "Song Two",
    artist: "Artist Beta",
    album: "Album B",
    dateAdded: "2023-02-01",
    songTime: "4:20",
    image: mocksong,
  },
  {
    id: 3,
    title: "Song Three",
    artist: "Artist Gamma",
    album: "Album C",
    dateAdded: "2023-03-01",
    songTime: "2:30",
    image: mocksong,
  },
  {
    id: 4,
    title: "Midnight Drive",
    artist: "Artist Delta",
    album: "Night Moves",
    dateAdded: "2023-04-10",
    songTime: "3:55",
    image: mocksong,
  },
  {
    id: 5,
    title: "Sunrise",
    artist: "Artist Epsilon",
    album: "Morning Light",
    dateAdded: "2023-05-15",
    songTime: "4:05",
    image: mocksong,
  },
  {
    id: 6,
    title: "Lost in Sound",
    artist: "Artist Zeta",
    album: "Echoes",
    dateAdded: "2023-06-20",
    songTime: "3:15",
    image: mocksong,
  },
  {
    id: 7,
    title: "Waves",
    artist: "Artist Eta",
    album: "Oceanic",
    dateAdded: "2023-07-25",
    songTime: "5:10",
    image: mocksong,
  },
  {
    id: 8,
    title: "City Lights",
    artist: "Artist Theta",
    album: "Urban Nights",
    dateAdded: "2023-08-30",
    songTime: "3:40",
    image: mocksong,
  },
  {
    id: 9,
    title: "Heartbeat",
    artist: "Artist Iota",
    album: "Pulse",
    dateAdded: "2023-09-05",
    songTime: "2:55",
    image: mocksong,
  },
  {
    id: 10,
    title: "Reflections",
    artist: "Artist Kappa",
    album: "Mirror",
    dateAdded: "2023-10-12",
    songTime: "4:30",
    image: mocksong,
  },
  {
    id: 11,
    title: "Starlight",
    artist: "Artist Lambda",
    album: "Cosmos",
    dateAdded: "2023-11-18",
    songTime: "3:25",
    image: mocksong,
  },
  {
    id: 12,
    title: "Gravity",
    artist: "Artist Mu",
    album: "Spacebound",
    dateAdded: "2023-12-22",
    songTime: "4:00",
    image: mocksong,
  },
  {
    id: 13,
    title: "Dreamscape",
    artist: "Artist Nu",
    album: "Visions",
    dateAdded: "2024-01-10",
    songTime: "3:50",
    image: mocksong,
  },
];

function PlaylistTable({ items, render }) {
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, 6);

  // Used on a button to toggle the visibility of all items
  function handleShowAll() {
    setShowAll((previous) => !previous);
  }

  return (
    <StyledTable>
      <StyledTable.Header as="header" columns="3rem repeat(4, 1fr)">
        <div>#</div>
        <div>Title</div>
        <div>Album</div>
        <div>Date Added</div>
        <div>Song Time</div>
      </StyledTable.Header>
      {showAll ? items.map(render) : displayedItems.map(render)}
      {
        <FeaturedButton onClick={handleShowAll}>
          {showAll ? "Show less" : "Show more"}
        </FeaturedButton>
      }
    </StyledTable>
  );
}

export default PlaylistTable;
