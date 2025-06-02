// components/ChannelPage.jsx
import React from "react";
import SubscribeButton from "../subcription/SubscribeButton";

const ChannelVideoList = ({ channel }) => {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Channel Header with Background Thumbnail */}
      <div className="relative mb-16">
        {/* Thumbnail Background */}
        <div className="h-40 w-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg relative overflow-hidden">
          {channel.coverImage && (
            <img
              src={channel.coverImage}
              alt="Cover"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          )}
        </div>

        {/* Channel Profile with Subscribe Button */}
        <div className="absolute -bottom-16 left-4 right-4 flex flex-col md:flex-row items-center md:items-end gap-4">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center relative">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                <img src={channel.avatar} alt="" className="w-full" />
              </span>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold"># React Patterns</h1>
                <p className="text-gray-600">@{channel.fullName}</p>
              </div>
              <SubscribeButton />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              {channel.subscribers.length} Subscribers -{" "}
              {channel.channelsSubscribedToCount} Subscribed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelVideoList;
