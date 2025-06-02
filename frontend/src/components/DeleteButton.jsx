import { Trash } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeVideo } from "../features/videos/videoSlice";
import { deleteTweet, fetchUserTweet } from "../features/tweets/tweetSlice";
import { fetchChannelVideos } from "../features/dashboard/dashboardSlice";

function DeleteButton({ type, id }) {
  const dispatch = useDispatch();
  const { _id, userName } = useSelector((state) => state.auth.user);

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );

    if (confirmed) {
      if (type === "video") {
        dispatch(removeVideo(id));
        dispatch(fetchChannelVideos(_id));
      } else if (type === "tweet") {
        dispatch(deleteTweet(id));
        dispatch(fetchUserTweet(userName));
      }
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>
        <Trash className="text-red-700 font-black" />
      </button>
    </div>
  );
}

export default DeleteButton;
