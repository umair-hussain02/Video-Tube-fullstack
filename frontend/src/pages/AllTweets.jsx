import React, { useEffect, useState } from "react";
import TweetCard from "../components/tweets/TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { allTweets } from "../features/tweets/tweetSlice";
import Loader from "../components/Loader";
import { Plus } from "lucide-react";
import AddTweet from "../components/tweets/AddTweet";

function AllTweets() {
  const dispatch = useDispatch();
  const { tweets, error, loading } = useSelector((state) => state.tweets);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    dispatch(allTweets());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="px-10">
      <div className="flex text-center align-middle justify-between pb-8">
        <h1 className="text-3xl font-semibold">Tweets</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 flex text-center align-middle justify-center px-4 py-2"
        >
          <Plus size={20} /> Tweet
        </button>
        {showAdd && <AddTweet onClose={() => setShowAdd(false)} />}
      </div>
      <div>
        {Array.isArray(tweets) && tweets.length > 0 ? (
          tweets.map((tweet) => <TweetCard tweet={tweet} key={tweet._id} />)
        ) : (
          <h1 className="text-7xl">No Tweet available.</h1>
        )}
      </div>
    </div>
  );
}

export default AllTweets;
