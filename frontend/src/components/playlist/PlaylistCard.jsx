import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlaylistEditingOptions from "./PlaylistEditingOptions";
import PlaylistEditModal from "./PlaylistEditModal";
import { deletePlaylist } from "../../features/playlist/playlistSlice";

const PlaylistCard = ({ playlist, onUpdate }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const optionsRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsEditModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    dispatch(deletePlaylist(playlist._id));
    onUpdate();
  };

  const handleEllipsisClick = (e) => {
    e.stopPropagation();
    e.preventDefault(); // prevent navigation
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <div className="relative">
      <div className="relative w-full overflow-hidden">
        <Link to={`/playlist/${playlist._id}`}>
          <img
            src={
              playlist.videos[0]?.thumbnail ||
              "https://cdn-icons-png.flaticon.com/512/11065/11065753.png"
            }
            alt={playlist.name}
            className="w-full h-64 object-cover"
          />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-white text-lg font-normal">{playlist.name}</h2>
            <p className="text-white text-sm font-light">
              {playlist.views || 0} Views · {playlist.timeAgo || "N/A"}
            </p>
          </div>
          <div className="flex gap-4 items-center relative">
            <p className="text-white text-base font-normal">
              {playlist.videos?.length || 0} video
              {playlist.videos?.length !== 1 ? "s" : ""}
            </p>
            <button onClick={handleEllipsisClick}>
              <EllipsisVertical className="text-white" />
            </button>
            {isOptionsOpen && (
              <PlaylistEditingOptions
                onClose={() => setIsOptionsOpen(false)}
                onEdit={() => setIsEditModalOpen(true)}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <PlaylistEditModal
          playlist={playlist}
          onUpdate={onUpdate}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PlaylistCard;
