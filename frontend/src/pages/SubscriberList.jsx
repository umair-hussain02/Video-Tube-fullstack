import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriberList } from "../features/subscriptions/subscriptionSlice";
import SubscriptionCard from "../components/subcription/SubscriptionCard";

const SubscriberList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const [hasFetched, setHasFetched] = useState(false);

  const {
    subscriberList: subscribers,
    loading,
    error,
  } = useSelector((state) => state.subscription);

  useEffect(() => {
    if (userId && !hasFetched) {
      dispatch(fetchSubscriberList(userId));
      setHasFetched(true);
    }
  }, [userId, dispatch, hasFetched]);

  if (loading) {
    return <h1 className="text-2xl text-white">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-2xl text-red-500">Error: {error}</h1>;
  }

  return (
    <div>
      {Array.isArray(subscribers) && subscribers.length > 0 ? (
        subscribers.map((subscriber) => (
          <SubscriptionCard subscriber={subscriber} key={subscriber._id} />
        ))
      ) : (
        <h1 className="text-2xl text-white">No Subscriber found.</h1>
      )}
    </div>
  );
};

export default SubscriberList;
