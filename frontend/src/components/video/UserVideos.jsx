import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Videocards from "./Videocards";
import { getUserVideos } from "../../features/videos/videoSlice";
import { useParams } from "react-router-dom";

function UserVideos() {
  const { username } = useParams();

  const dispatch = useDispatch();
  const { userVideos } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(getUserVideos(username));
  }, [username]);

  return (
    <div className="flex">
      {Array.isArray(userVideos) && userVideos.length > 0 ? (
        userVideos.map((video) => <Videocards key={video._id} video={video} />)
      ) : (
        <h1 className="text-7xl">No videos available.</h1> // Display this if there are no videos
      )}
    </div>
  );
}

export default UserVideos;
