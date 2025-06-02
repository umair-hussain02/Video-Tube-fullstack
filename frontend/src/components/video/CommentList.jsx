import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/comments/commentSlice";
import CommentTweetLikeButton from "../CommentTweetLikeButton";

const CommentList = ({ videoId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);

  useEffect(() => {
    if (videoId) {
      dispatch(fetchComments({ videoId }));
    }
  }, [dispatch, videoId]);

  if (loading) return <p className="mt-4">Loading comments...</p>;
  if (error) return <p className="mt-4 text-red-500">Error: {error}</p>;

  return (
    <div className="mt-6 space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="border-b pb-3">
            <div className="flex items-center gap-3 mb-1">
              {/* {console.log(comment)} */}
              <img
                src={comment.owner?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-sm">{comment.owner?.userName}</span>
              <span className="text-sm text-gray-500 ml-auto">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 text-sm">{comment.content}</p>
            {comment.likes}
            <CommentTweetLikeButton type={"comment"} id={comment._id} />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
