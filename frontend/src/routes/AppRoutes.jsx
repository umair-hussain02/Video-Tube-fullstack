import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "../layouts/mainLayout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PlaylistDetail from "../pages/PlaylistDetail";
import WatchHistoryPage from "../pages//WatchHistoryPage";
import PrivateRoutes from "./PrivateRoutes";
import Notfound from "../pages/Notfound";
import Home from "../pages/Home";
import Uploadvideo from "../pages/Uploadvideo";
import VideoPage from "../pages/VideoPage";
import LikedVideo from "../pages/LikedVideo";
import AllTweets from "../pages/AllTweets";
import SubscriberList from "../pages/SubscriberList";
import ChannelPage from "../pages/ChannelPage";
import Playlist from "../pages/Playlist";
import SearchResults from "../components/SearchResults";
import CreatePlaylist from "../components/playlist/CreatePlaylist";
import Dashboard from "../pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },

      //Auth Pages
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/watch/:videoId",
        element: <VideoPage />,
      },
      {
        path: "/playlist/:playlistId",
        element: <PlaylistDetail />,
      },
      // Protected Pages
      {
        path: "/playlist",
        element: (
          <PrivateRoutes>
            <Playlist />,
          </PrivateRoutes>
        ),
      },
      {
        path: "/create-playlist",
        element: (
          <PrivateRoutes>
            <CreatePlaylist />,
          </PrivateRoutes>
        ),
      },
      {
        path: "history",
        element: (
          <PrivateRoutes>
            <WatchHistoryPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/c/:username",
        element: <ChannelPage />,
      },
      {
        path: "/upload-video",
        element: (
          <PrivateRoutes>
            <Uploadvideo />
          </PrivateRoutes>
        ),
      },
      {
        path: "liked-videos",
        element: (
          <PrivateRoutes>
            <LikedVideo />
          </PrivateRoutes>
        ),
      },
      {
        path: "all-tweets",
        element: <AllTweets />,
      },
      {
        path: "subscribers",
        element: (
          <PrivateRoutes>
            <SubscriberList />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

const AppRoutes = () => <RouterProvider router={routes} />;
export default AppRoutes;
