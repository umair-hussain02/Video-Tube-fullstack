import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchHistory } from "../features/watchHistory/watchHistorySlice";
import VideoCard from "../components/video/Videocards";

const WatchHistoryPage = () => {
  const dispatch = useDispatch();

  const { watchHistory, loading, error } = useSelector(
    (state) => state.history
  );
  console.log(watchHistory);

  useEffect(() => {
    dispatch(fetchWatchHistory());
  }, [dispatch]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Watch History</h1>

      {loading && (
        <p className="text-center text-gray-500">Loading watch history...</p>
      )}

      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && watchHistory.length === 0 && (
        <p className="text-center text-gray-500">No videos in watch history.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {watchHistory.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default WatchHistoryPage;
