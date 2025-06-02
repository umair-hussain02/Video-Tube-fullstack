import React, { useEffect } from "react";
import Videocards from "../components/video/Videocards";
import { useDispatch, useSelector } from "react-redux";
import { getAllvideos } from "../features/videos/videoSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { setSidebarCollapsed } from "../features/sidebar/sidebarSlice";

function Home() {
  const dispatch = useDispatch();
  const { videos, error, loading } = useSelector((state) => state.videos);
  useEffect(() => {
    dispatch(setSidebarCollapsed(false)); // or false
  }, []);
  // console.log(videos);

  // const user = JSON.parse(localStorage.getItem("User"));
  // console.log(user.avatar);

  // const { refreshToken } = useSelector((state) => state.auth);
  // console.log(refreshToken);

  // useEffect(() => {
  //   const token = localStorage.getItem("RefreshToken");
  //   if (token) {
  //     console.log("Refresh token:", token);
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getAllvideos())
      .unwrap()
      .then((data) => console.log("Fetched videos:", data))
      .catch((err) => console.log("Error fetching videos:", err));
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  // const testvideo = async () => {
  //   const response = await videoApi.fecthAllVideos();
  //   return response.data;
  // };

  // testvideo().then((data) => {
  //   console.log(`Manaual request: ${data} `);
  // });

  // console.log(videos);

  return (
    <>
      <div className="flex">
        {/* <Uploadvideo /> */}
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => <Videocards key={video._id} video={video} />)
        ) : (
          <h1 className="text-7xl">No videos available.</h1> // Display this if there are no videos
        )}
      </div>
    </>
  );
}

export default Home;
