import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTweet } from "../../features/tweets/tweetSlice";

function EditTweets({ tweet, onClose }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState(tweet?.content || "");
  const handleUpdate = async () => {
    if (!content.trim()) {
      alert("Tweet can not be empty...");
    }
    try {
      await dispatch(editTweet({ tId: tweet._id, content })).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-black text-white border border-gray-300 p-6 rounded-sm w-full max-w-md shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Edit Tweet</h2>

        <textarea
          rows="4"
          className="w-full p-3 border border-gray-600 bg-black focus:outline-none focus:ring focus:ring-purple-300 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTweets;
