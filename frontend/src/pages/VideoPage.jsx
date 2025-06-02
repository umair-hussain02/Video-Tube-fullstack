import React, { useEffect, useState } from "react";
import VideoInfoSection from "../components/video/VideoInfoSection";
import VideoList from "../components/video/VideoList";
import CommentList from "../components/video/CommentList";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axios-instance";
import CommentInputBox from "../components/video/CommentInputBox";
import { useDispatch } from "react-redux";
import { addVideoToWatchHistory } from "../features/watchHistory/watchHistorySlice";
import videoApi from "../features/videos/videoApi";
import { setSidebarCollapsed } from "../features/sidebar/sidebarSlice";

function VideoPage() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    dispatch(setSidebarCollapsed(true)); // or false
  });

  // Watch history tracking
  useEffect(() => {
    if (videoId && user?._id) {
      dispatch(addVideoToWatchHistory({ videoId }));
    }
  }, [videoId]);

  // Fetch current video
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`/videos/${videoId}`);
        setVideo(res.data);
      } catch (err) {
        setError("Fail to Load Video...", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [videoId]);

  // Fetch all videos to recommend (excluding current)
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await videoApi.fecthAllVideos();
        const allVideos = res.data.data.videos;

        // Filter out the currently playing video
        const filtered = allVideos.filter((vid) => vid._id !== videoId);

        // Optional: sort by popularity, category, or latest
        setRecommendedVideos(filtered.slice(0, 10)); // limit to top 10
      } catch (err) {
        console.error("Error fetching recommended videos", err);
      }
    };

    if (videoId) {
      fetchRecommendations();
    }
  }, [videoId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:w-2/3">
          <div className="relative bg-gray-800 w-full h-96 rounded-lg mb-4 flex items-center justify-center">
            <video
              className="w-full h-full"
              src={video?.data?.videoFile}
              controls
              autoPlay
            ></video>
          </div>

          <VideoInfoSection video={video} />
          <div className="border border-gray-600 my-4 p-4">
            <CommentInputBox videoId={video?.data?._id} />
            <CommentList videoId={video?.data?._id} />
          </div>
        </div>

        {/* Right Section - Recommended Videos */}
        <div className="">
          <h3 className="text-xl font-semibold ">Recommended</h3>
          <VideoList videos={recommendedVideos} />
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
