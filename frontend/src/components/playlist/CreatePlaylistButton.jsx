import React from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { Link } from "react-router-dom";

function CreatePlaylistButton() {
  return (
    <Link
      to="/upload-video"
      className="relative group bg-[#AE7AFF] text-white py-2 px-5 rounded-lg hover:bg-[#7b54b9] transition duration-300 flex items-center justify-center"
    >
      <CgPlayListAdd size={20} />

      {/* Tooltip */}
      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        Add new playlist
      </span>
    </Link>
  );
}

export default CreatePlaylistButton;
