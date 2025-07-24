import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* Global CSS Styles */
import GlobalStyles from "./styles/GlobalStyles";

/* Critical path components - NO lazy loading */
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import AppLayout from "./ui/AppLayout/AppLayout";
import MediaForm from "./pages/MediaForm/MediaForm";
import { Toaster } from "react-hot-toast";
import { toasterOptions } from "./data/toasterOptions";

/* Lazy loaded components */
const Devices = lazy(() => import("./pages/Devices/Devices"));
const Subscriptions = lazy(() => import("./pages/Subscriptions/Subscriptions"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const PlaylistDetails = lazy(() =>
  import("./pages/PlaylistDetails/PlaylistDetails")
);
const Albums = lazy(() => import("./pages/Albums/Albums"));
const Artists = lazy(() => import("./pages/Artists/Artists"));
const Stations = lazy(() => import("./pages/Stations/Stations"));
const Podcasts = lazy(() => import("./pages/Podcasts/Podcasts"));
const CreatePodcasts = lazy(() => import("./pages/Podcasts/CreatePodcasts"));
const MediaItemPage = lazy(() => import("./pages/MediaItemPage/MediaItemPage"));

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
        path: "create",
        children: [
          {
            path: ":type", // Allowed types: artist, album, song
            element: <MediaForm />,
          },
        ],
      },
      {
        path: "media",
        children: [{ path: ":type/:mediaItemId", element: <MediaItemPage /> }],
      },
    ],
  },
]);

// React Query Client and other providers can be added here if needed
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster {...toasterOptions} />
    </QueryClientProvider>
  );
}

export default App;
