import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePlaylist } from "../../features/playlist/playlistSlice";

function PlaylistEditModal({ playlist, onClose, onUpdate }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePlaylist({
        playlistId: playlist._id,
        payload: { name, description },
      })
    );
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black text-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4">Edit Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaylistEditModal;
