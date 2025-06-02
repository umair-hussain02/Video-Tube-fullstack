import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSubscribedChannelList } from "../../features/subscriptions/subscriptionSlice";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import SubscriptionCard from "./SubscriptionCard";

function UserSubcribedChannel() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { subscribedChannels, error, loading } = useSelector(
    (state) => state.subscription
  );
  useEffect(() => {
    dispatch(fetchSubscribedChannelList(username));
  }, [dispatch]);
  console.log(subscribedChannels);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {Array.isArray(subscribedChannels) && subscribedChannels.length > 0 ? (
        subscribedChannels.map((subscribed) => (
          <SubscriptionCard subscriber={subscribed} key={subscribed._id} />
        ))
      ) : (
        <h1 className="text-2xl text-white">No Subscribed channel found.</h1>
      )}
    </div>
  );
}
export default UserSubcribedChannel;
