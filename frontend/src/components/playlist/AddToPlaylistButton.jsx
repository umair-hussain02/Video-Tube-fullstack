// src/components/AddToPlaylistButton.jsx
import React, { useState } from "react";
import SaveToPlaylistModal from "../playlist/SaveToPlaylistModal";

const AddToPlaylistButton = ({ videoId, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Save Icon Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        title="Save to playlist"
        className="absolute top-2 right-2 bg-black bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17 3a2 2 0 00-2-2H5a2 2 0 00-2 2v14l7-4 7 4V3z" />
        </svg>
      </button>

      {/* Modal */}
      <SaveToPlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={videoId}
        userId={userId}
      />
    </>
  );
};

export default AddToPlaylistButton;
