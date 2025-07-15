import {
  FaHome,
  FaTabletAlt,
  FaRegCreditCard,
  FaCog,
  FaMusic,
  FaCompactDisc,
  FaUserAlt,
  FaBroadcastTower,
  FaPodcast,
} from "react-icons/fa";

const sidebarItems = [
  { label: "Home", icon: <FaHome />, path: "/home", notification: "" },
  {
    label: "Devices",
    icon: <FaTabletAlt />,
    path: "/devices",
    notification: 10,
  },
  {
    label: "Subscriptions",
    icon: <FaRegCreditCard />,
    path: "/subscriptions",
    notification: "",
  },
  { label: "Settings", icon: <FaCog />, path: "/settings", notification: "" },
  {
    label: "Playlists",
    icon: <FaMusic />,
    path: "/playlists",
    notification: "",
  },
  {
    label: "Albums",
    icon: <FaCompactDisc />,
    path: "/albums",
    notification: "",
  },
  { label: "Artists", icon: <FaUserAlt />, path: "/artists", notification: "" },
  {
    label: "Stations",
    icon: <FaBroadcastTower />,
    path: "/stations",
    notification: "",
  },
  {
    label: "Podcasts",
    icon: <FaPodcast />,
    path: "/podcasts",
    notification: "Add new",
  },
];

export default sidebarItems;
