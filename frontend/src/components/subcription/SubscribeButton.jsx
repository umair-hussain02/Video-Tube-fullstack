import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  toggleSubscription,
} from "../../features/subscriptions/subscriptionSlice";
import { useNavigate } from "react-router-dom";

const SubscribeButton = ({ channelId, setSubscriberList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSubscribed } = useSelector((state) => state.subscription);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id && channelId && user._id !== channelId) {
      dispatch(checkSubscriptionStatus(channelId));
    }
  }, [dispatch, user?._id, channelId]);

  const handleToggle = () => {
    if (!user) {
      return navigate("/login");
    }

    if (user._id === channelId) {
      alert("You cannot subscribe to your own channel.");
      return;
    }

    dispatch(toggleSubscription(channelId)).then(() => {
      // Toggle local subscriberList state manually
      const alreadySubscribed = isSubscribed;

      if (alreadySubscribed) {
        // Remove subscriber from local list
        setSubscriberList((prev) =>
          prev.filter((s) => s.subscriber._id !== user._id)
        );
      } else {
        // Add subscriber to local list
        setSubscriberList((prev) => [
          ...prev,
          {
            _id: new Date().toISOString(), // temporary ID
            subscriber: {
              _id: user._id,
              userName: user.userName,
              avatar: user.avatar,
            },
            totalSubscribers: 0,
          },
        ]);
      }

      dispatch(checkSubscriptionStatus(channelId));
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded text-white ${
        isSubscribed ? "bg-gray-600" : "bg-[#AE7AFF] hover:bg-[#7f5abc] "
      }`}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
