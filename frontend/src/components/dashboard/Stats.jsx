import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelStats } from "../../features/dashboard/dashboardSlice";
import { Eye, Heart, Loader, User } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

function Stats() {
  const userid = useSelector((state) => state.auth.user?._id);
  const dispatch = useDispatch();
  const { stats, error, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchChannelStats(userid));
  }, [dispatch, userid]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
      <div className="flex flex-col items-center justify-center border rounded-sm bg-white/10 shadow-lg p-6 text-white w-full">
        <Heart className="text-[#7b54b9]" size={36} />
        <h2 className="text-lg font-semibold mt-3">Total Likes</h2>
        <p className="text-2xl font-bold mt-1">{stats.totalLikes}</p>
      </div>
      <div className="flex flex-col items-center justify-center border rounded-sm bg-white/10 shadow-lg p-6 text-white w-full">
        <User className="text-[#7b54b9]" size={36} />
        <h2 className="text-lg font-semibold mt-3">Total Subscribers</h2>
        <p className="text-2xl font-bold mt-1">{stats.totalSubscribers}</p>
      </div>
      <div className="flex flex-col items-center justify-center border rounded-sm bg-white/10 shadow-lg p-6 text-white w-full">
        <Eye className="text-[#7b54b9]" size={36} />
        <h2 className="text-lg font-semibold mt-3">Total Views</h2>
        <p className="text-2xl font-bold mt-1">{stats.totalViews}</p>
      </div>
    </div>
  );
}

export default Stats;
