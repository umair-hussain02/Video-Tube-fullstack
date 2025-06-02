import React from "react";
import { Link } from "react-router-dom";
import formatDuration from "../../features/formatDuration";
import AddToPlaylistButton from "../playlist/AddToPlaylistButton";
import { useSelector } from "react-redux";

const VideoCard = ({ video }) => {
  const { user } = useSelector((state) => state.auth);

  console.log(video);

  return (
    <div className="w-full m-4 max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      {/* Thumbnail and Save Button */}
      <div className="relative">
        <Link to={`/watch/${video._id}`} className="block">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        </Link>

        {user && <AddToPlaylistButton videoId={video._id} />}
      </div>

      {/* Info section */}
      <div className="flex p-4">
        <Link to={`/c/${video.creater.userName}`}>
          <img
            src={video.creater.avatar}
            alt={video.creater._id}
            className="w-10 h-10 rounded-full mr-4"
          />
        </Link>

        <div className="flex-1 text-white">
          <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-xs">
            {video.views} views •{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </p>
          <p>{video.creater.userName}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
