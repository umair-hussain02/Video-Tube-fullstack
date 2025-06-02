import React, { useEffect, useState } from "react";

import LikeButton from "../LikeButton";
import agoTime from "../../features/agoTime";

import { useDispatch } from "react-redux";
import { fetchSubscriberList } from "../../features/subscriptions/subscriptionSlice";
import SubscribeButton from "../subcription/SubscribeButton";
import DislikeButton from "../DislikeButton";

function VideoInfoSection(prop) {
  const dispatch = useDispatch();
  const [subscriberList, setSubscriberList] = useState([]);

  const creatorId = prop.video.data.creater._id;

  useEffect(() => {
    if (creatorId) {
      dispatch(fetchSubscriberList(creatorId)).then((res) => {
        if (res.payload) {
          setSubscriberList(res.payload.subscribers || []);
        }
      });
    }
  }, [dispatch, creatorId]);

  const isoDate = prop.video.data.createdAt;
  const timeAgo = agoTime(isoDate);

  return (
    <div className=" w-full border border-gray-600 rounded-sm p-4 text-white">
      <div>
        <h2 className="font-semibold text-white text-lg leading-tight">
          {prop.video.data.title}
        </h2>
        <p className="text-gray-300 text-sm mt-1">
          {prop.video.data.views} Views · {timeAgo}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border border-gray-600 p-2 rounded-2xl w-max">
        <LikeButton video={prop.video.data} /> |
        {/* <DislikeButton video={prop.video.data} /> */}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            alt="Channel profile picture"
            className="rounded-full w-10 h-10 object-cover"
            height="40"
            src={prop.video.data.creater.avatar}
            width="40"
          />
          <div>
            <p className="text-white text-sm font-normal">
              {prop.video.data.creater.userName}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">
              {subscriberList.length} Subscribers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SubscribeButton
            channelId={creatorId}
            setSubscriberList={setSubscriberList}
            subscriberList={subscriberList}
          />
        </div>
      </div>

      <div className="mt-4 border-t border-gray-600 pt-2 text-white text-sm leading-snug">
        {prop.video.data.description}
      </div>
    </div>
  );
}

export default VideoInfoSection;
