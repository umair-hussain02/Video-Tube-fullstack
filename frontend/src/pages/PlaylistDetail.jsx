import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import playlistApi from "../features/playlist/playlistApi";
import Loader from "../components/Loader"; // Optional: replace with your own loader
import VideoCard from "../components/video/Videocards";

const GetPlaylistById = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    playlistApi
      .getById(playlistId)
      .then((res) => {
        setPlaylist(res.data?.data);
        setError("");
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || "Failed to load playlist";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [playlistId]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-center text-red-600 mt-10 text-sm">{error}</div>
    );

  if (!playlist)
    return (
      <div className="text-center text-gray-500 mt-10">Playlist not found.</div>
    );
  console.log(playlist.owner.userName);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Playlist Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-1">
          {playlist.name}
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <img src={playlist.owner.avatar} className="w-8 h-8 rounded-full" />
          <p className="text-sm text-gray-200 font-bold">
            {playlist.owner.userName}
          </p>
          <div>
            <p className="text-gray-300">{playlist.description}</p>
          </div>
        </div>
      </div>

      {/* Playlist Videos */}
      {playlist.videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos in this playlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlist.videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GetPlaylistById;
