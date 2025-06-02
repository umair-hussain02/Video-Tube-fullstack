import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTweet } from "../../features/tweets/tweetSlice";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import TweetCard from "./TweetCard";

function UserTweets() {
  const { username } = useParams();
  console.log(username);

  const dispatch = useDispatch();
  const { userTweets, error, loading } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchUserTweet(username));
  }, [dispatch]);
  //   console.log(tweets);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {Array.isArray(userTweets) && userTweets.length > 0 ? (
        userTweets.map((tweet) => <TweetCard tweet={tweet} key={tweet._id} />)
      ) : (
        <h1 className="text-2xl text-white">No Tweet available.</h1>
      )}
    </div>
  );
}

export default UserTweets;
