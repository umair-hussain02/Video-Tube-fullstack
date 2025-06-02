import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addComment,
  fetchComments,
} from "../../features/comments/commentSlice";

const CommentInputBox = ({ videoId }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await dispatch(addComment({ videoId, content })).unwrap();
      setContent("");
      dispatch(fetchComments({ videoId })); // Refresh comment list
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-start gap-2 mt-4 border-b border-gray-600 p-2"
    >
      <textarea
        className="w-full border-none rounded-md p-2 text-sm resize-none bg-black focus:outline-none focus:ring-0 focus:border-none text-white"
        rows={1}
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#AE7AFF] text-white px-4 py-2 rounded-md hover:bg-[#9666e2]"
      >
        Post
      </button>
    </form>
  );
};

export default CommentInputBox;
