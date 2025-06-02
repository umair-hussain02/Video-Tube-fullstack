import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import DeleteButton from "../DeleteButton";
import { fetchUserTweet } from "../../features/tweets/tweetSlice";
import { Pencil } from "lucide-react";
import EditTweets from "../tweets/EditTweets";

function Tweets() {
  const username = useSelector((state) => state.auth.user?.userName);
  const dispatch = useDispatch();
  const { userTweets, error } = useSelector((state) => state.tweets);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchUserTweet(username));
  }, [dispatch, username]);

  const handleOnClose = () => {
    setShowEdit(true);
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <table className="w-full table-auto border-collapse text-white border">
        <thead className="bg-black/70 border ">
          <tr>
            <th className="p-3 text-left">Edit</th>
            <th className="p-3 text-left">Content</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Date uploaded</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userTweets) &&
            userTweets.map((tweet) => (
              <tr className="border-b border-gray-700 hover:bg-black/50">
                <td className="p-3">
                  <button onClick={handleOnClose}>
                    <Pencil
                      size={18}
                      className="text-[#AE7AFF] hover:text-white "
                    />
                  </button>
                  {showEdit && (
                    <EditTweets
                      tweet={tweet}
                      onClose={() => setShowEdit(false)}
                    />
                  )}
                </td>
                {/* Content */}
                <td className="p-3">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span className="text-sm font-medium">{tweet.content}</span>
                  </div>
                </td>

                {/* Likes / Dislikes */}
                <td className="p-3">
                  <div className="flex gap-2 whitespace-nowrap">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                      5 likes
                    </span>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm">
                      0 dislikes
                    </span>
                  </div>
                </td>

                {/* Upload Date */}
                <td className="p-3 text-sm">
                  {new Date(tweet.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <DeleteButton size={15} type={"tweet"} id={tweet._id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tweets;
