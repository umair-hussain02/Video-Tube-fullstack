import React, { useEffect, useState } from "react";
import Stats from "../components/dashboard/Stats";
import { setSidebarCollapsed } from "../features/sidebar/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Videos from "../components/dashboard/Videos";
import Tweets from "../components/dashboard/Tweets";
import AddTweet from "../components/tweets/AddTweet";

function Dashboard() {
  const [showAdd, setShowAdd] = useState(false);

  const channelName = useSelector((state) => state.auth.user?.userName);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebarCollapsed(true));
  });
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome Back, {channelName}</h2>
          <p className="text-sm">
            Seamless Video Management, Elevated Results.
          </p>
        </div>
      </div>
      <Stats />
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Videos</h2>
        </div>
        <div>
          <Link
            to="/upload-video"
            className="bg-[#AE7AFF] font-semibold flex justify-center align-middle text-black py-1 px-3  rounded-sm hover:bg-[#7b54b9] transition duration-300"
          >
            <Plus className="pr-3" /> Upload Video
          </Link>
        </div>
      </div>
      <Videos />
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tweets</h2>
        </div>
        <div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[#AE7AFF] font-semibold flex justify-center align-middle text-black py-1 px-3  rounded-sm hover:bg-[#7b54b9] transition duration-300"
          >
            <Plus size={20} />
            Add Tweet
          </button>
          {showAdd && <AddTweet onClose={() => setShowAdd(false)} />}
        </div>
      </div>
      <Tweets />
    </div>
  );
}

export default Dashboard;
