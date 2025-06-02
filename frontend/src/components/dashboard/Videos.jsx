import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelVideos } from "../../features/dashboard/dashboardSlice";
import ErrorMessage from "../ErrorMessage";
import DeleteButton from "../DeleteButton";
import { toggleVideoPublish } from "../../features/videos/videoSlice";

function Videos() {
  const userid = useSelector((state) => state.auth.user?._id);
  const dispatch = useDispatch();
  const { videos, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchChannelVideos(userid));
  }, [dispatch, userid]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <table className="w-full table-auto border-collapse text-white border">
        <thead className="bg-black/70 border ">
          <tr>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Uploaded</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Date uploaded</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(videos) &&
            videos.map((video) => (
              <tr className="border-b border-gray-700 hover:bg-black/50">
                {/* Toggle Switch */}
                <td className="p-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => {
                        dispatch(toggleVideoPublish(video._id));
                      }}
                      defaultChecked={video.isPublished}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 relative after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </td>

                {/* Published/Unpublished Label */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      video.isPublished
                        ? "bg-green-900 text-green-400 border border-green-500"
                        : "bg-orange-900 text-orange-400 border border-orange-500"
                    }`}
                  >
                    {video.isPublished ? "Published" : "Unpublished"}
                  </span>
                </td>

                {/* Thumbnail + Title */}
                <td className="p-3">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium">{video.title}</span>
                  </div>
                </td>

                {/* Likes / Dislikes */}
                <td className="p-3">
                  <div className="flex gap-2 whitespace-nowrap">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                      {video.likes} likes
                    </span>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">
                      {video.dislikes} dislikes
                    </span>
                  </div>
                </td>

                {/* Upload Date */}
                <td className="p-3 text-sm">
                  {new Date(video.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <DeleteButton size={15} type={"video"} id={video._id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Videos;
