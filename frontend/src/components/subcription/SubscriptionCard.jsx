import React from "react";
import SubscribeButton from "./SubscribeButton";
import { Link } from "react-router-dom";

function SubscriptionCard({ subscriber }) {
  console.log(subscriber);

  return (
    <div className="flex items-center justify-between px-6 py-4 w-full border border-gray-800">
      <div className="flex items-center space-x-4">
        <Link
          to={`/c/${
            subscriber.subscriber.userName || subscriber.channel.userName
          }`}
        >
          <img
            alt="Subscriber avatar"
            className="w-10 h-10 rounded-full object-cover"
            src={subscriber.subscriber.avatar || subscriber.channel.avatar}
            width="40"
            height="40"
          />
        </Link>
        <div>
          <p className="text-white font-semibold text-base leading-5">
            {subscriber.subscriber.userName || subscriber.channel.userName}
          </p>
          <p className="text-gray-400 text-sm leading-4">
            {subscriber.totalSubscribers} Subscribers
          </p>
        </div>
      </div>

      <SubscribeButton channelId={subscriber.subscriber._id} />
    </div>
  );
}

export default SubscriptionCard;
