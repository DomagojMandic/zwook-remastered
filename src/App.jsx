/*
Login credentials:
email: mandic.domagoj214@gmail.com
password: 12345678
or create your own account
*/
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/* Global CSS Styles */
import GlobalStyles from "./styles/GlobalStyles";
/* Critical path components - NO lazy loading */
import Login from "./pages/Auth/Login";
import AppLayout from "./ui/AppLayout/AppLayout";
import { Toaster } from "react-hot-toast";
import { toasterOptions } from "./data/toasterOptions";
import AudioPlayer from "./features/AudioPlayer/AudioPlayer";
import ErrorPage from "./pages/Errors/Error";
import AuthProvider from "./contexts/AuthContext";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

/* Lazy loaded components */
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
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
const MediaForm = lazy(() => import("./pages/MediaForm/MediaForm"));

// AuthProvider wrapper component
function AuthWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
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
            children: [
              { path: ":type/:mediaItemId", element: <MediaItemPage /> },
            ],
          },
        ],
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <ErrorPage />
          </ProtectedRoute>
        ),
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
      <AudioPlayer />
    </QueryClientProvider>
  );
}

export default App;
