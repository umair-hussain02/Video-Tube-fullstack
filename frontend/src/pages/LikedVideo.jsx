import React, { useEffect } from "react";
import VideoList from "../components/video/VideoList";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../features/like/likeSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function LikedVideos() {
  const dispatch = useDispatch();
  const { likedVideoIds, error, loading } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]); // Only run once on mount

  console.log(likedVideoIds);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return <VideoList videos={likedVideoIds} />;
}

export default LikedVideos;
