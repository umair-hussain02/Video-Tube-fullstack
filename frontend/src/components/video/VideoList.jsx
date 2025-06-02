import React from "react";
import { Link } from "react-router-dom";

function VideoList({ videos }) {
  if (!Array.isArray(videos) || videos.length === 0) {
    return <p className="text-white">No videos found.</p>;
  }

  return (
    <div className=" py-4 px-4 space-y-6">
      {videos.map((video, index) => (
        <Link to={`/watch/${video._id}`} key={index} className="block">
          <div className="flex gap-4 border border-gray-500 p-3">
            {/* Thumbnail */}
            <div className="flex-shrink-0 w-48 h-28 bg-gray-200 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Info */}
            <div className="flex-1">
              <div className="mb-1">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {video.title}
                </h3>
                {video.subtitle && (
                  <h4 className="text-base font-medium text-white">
                    {video.subtitle}
                  </h4>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-1">
                {video.views} Views • {video.time}
              </p>
              <p className="text-sm font-medium text-gray-300 mb-2">
                {video.author || "John Doe"}
              </p>
              <p className="text-sm text-gray-400 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoList;
