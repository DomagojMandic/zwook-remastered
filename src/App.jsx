import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import AppLayout from "./ui/AppLayout/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Devices from "./pages/Devices/Devices";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Settings from "./pages/Settings/Settings";
import PlaylistDetails from "./pages/PlaylistDetails/PlaylistDetails";
import Albums from "./pages/Albums/Albums";
import Artists from "./pages/Artists/Artists";
import Stations from "./pages/Stations/Stations";
import Podcasts from "./pages/Podcasts/Podcasts";
import CreatePodcasts from "./pages/Podcasts/CreatePodcasts";
import MediaItemPage from "./pages/MediaItemPage/MediaItemPage";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      { path: "home", element: <Dashboard /> },
      { path: "devices", element: <Devices /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "settings", element: <Settings /> },
      { path: "playlists", element: <PlaylistDetails /> },
      { path: "albums", element: <Albums /> },
      { path: "artists", element: <Artists /> },
      { path: "stations", element: <Stations /> },
      { path: "podcasts", element: <CreatePodcasts /> },
      { path: "artists", element: <Artists /> },
      {
        path: "media",
        children: [{ path: ":type/:mediaItemId", element: <MediaItemPage /> }],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
