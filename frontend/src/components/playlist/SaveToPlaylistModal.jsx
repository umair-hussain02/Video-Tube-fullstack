import React, { useEffect, useState } from "react";
import playlistApi from "../../features/playlist/playlistApi";
import { useDispatch, useSelector } from "react-redux";
import { addVideoToPlaylist } from "../../features/playlist/playlistSlice";
import { Link } from "react-router-dom";

const SaveToPlaylistModal = ({ isOpen, onClose, videoId }) => {
  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOpen && user.userName) {
      setLoading(true);
      setMessage({ type: "", text: "" });

      playlistApi
        .getUserPlaylists(user.userName)
        .then((res) => {
          const data = res.data?.data?.playlists || [];
          setPlaylists(data);
          setFiltered(data);
        })
        .catch(() => {
          setMessage({ type: "error", text: "Failed to load playlists." });
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, user.userName]);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFiltered(playlists.filter((p) => p.name.toLowerCase().includes(val)));
  };

  const handleSave = (playlistId) => {
    dispatch(addVideoToPlaylist({ videoId, playlistId }))
      .unwrap()
      .then(() => {
        setMessage({ type: "success", text: "Video saved to playlist." });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
          onClose();
        }, 1200);
      })
      .catch((err) => {
        setMessage({
          type: "error",
          text: err || "Failed to save video.",
        });
      });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  z-50 flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-black border rounded-sm max-w-md w-full p-5 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold mb-3">Save to Playlist</h2>

        {/* Optional Alert */}
        {message.text && (
          <div
            className={`text-sm px-3 py-2 mb-3 rounded ${
              message.type === "error"
                ? "bg-gray-500 text-red-600"
                : "bg-gray-500 text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search playlist..."
          className="w-full border rounded px-3 py-2 mb-4 text-sm bg-gray-900"
        />

        {/* Content */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No playlists found. Please create one first.
          </p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {filtered.map((playlist) => (
              <li
                key={playlist._id}
                className="cursor-pointer border border-gray-900 px-3 py-2 rounded text-gray-400 hover:bg-gray-800 hover:text-white"
                onClick={() => handleSave(playlist._id)}
              >
                {playlist.name}
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/create-playlist"
          className="relative mt-5 group bg-[#523284] text-white py-2 px-5 rounded-lg hover:bg-[#7b54b9] transition duration-300 flex items-center justify-center"
        >
          Create New Playlist
          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            Create new playlist
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SaveToPlaylistModal;
