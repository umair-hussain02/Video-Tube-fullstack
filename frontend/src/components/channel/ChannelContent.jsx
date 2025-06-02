import React, { useState } from "react";
import UserVideos from "../video/UserVideos";
import UserTweets from "../tweets/UserTweets";
import UserSubcribedChannel from "../subcription/UserSubcribedChannel";
import { useSelector } from "react-redux";
import UserSettingPanel from "../channel/UserSettingPanel";
import UserPlaylist from "../playlist/UserPlaylist";

function ChannelContent({ userName }) {
  const { user } = useSelector((state) => state.auth);

  // Properly check if the logged-in user is the channel owner
  const owner = user?.userName === userName;

  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 mt-8">
        <button
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === "videos"
              ? "border-gray-300 text-gray-300"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>

        <button
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === "playlist"
              ? "border-gray-300 text-gray-300"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("playlist")}
        >
          Playlist
        </button>

        <button
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === "tweets"
              ? "border-gray-300 text-gray-300"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("tweets")}
        >
          Tweets
        </button>

        <button
          className={`px-4 py-2 font-medium border-b-2 ${
            activeTab === "subscribed"
              ? "border-gray-300 text-gray-300"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("subscribed")}
        >
          Subscribed
        </button>

        {owner && (
          <button
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === "settings"
                ? "border-gray-300 text-gray-300"
                : "border-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        )}
      </div>

      {/* Conditionally Rendered Components */}
      {activeTab === "videos" && <UserVideos />}
      {activeTab === "playlist" && <UserPlaylist />}
      {activeTab === "tweets" && <UserTweets />}
      {activeTab === "subscribed" && <UserSubcribedChannel />}
      {activeTab === "settings" && owner && <UserSettingPanel />}
    </div>
  );
}

export default ChannelContent;
