import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { toggleCommentOrTweetLike } from "../features/like/likeSlice"; // update the path if needed
import { useCallback } from "react";

const CommentTweetLikeButton = ({ type, id }) => {
  const dispatch = useDispatch();
  const { likedTweetIds, likedCommentIds } = useSelector((state) => state.like);

  const isLiked =
    type === "comment"
      ? likedCommentIds.includes(id)
      : likedTweetIds.includes(id);

  const handleToggle = useCallback(() => {
    dispatch(toggleCommentOrTweetLike({ type, id }));
  }, [dispatch, type, id]);

  return (
    <button
      className="flex items-center space-x-1 text-sm hover:opacity-80 transition-all"
      onClick={handleToggle}
    >
      {isLiked ? (
        <AiFillLike className="text-blue-500" size={20} />
      ) : (
        <AiOutlineLike size={20} />
      )}
      <span>{isLiked ? "Liked" : "Like"}</span>
    </button>
  );
};

export default CommentTweetLikeButton;
