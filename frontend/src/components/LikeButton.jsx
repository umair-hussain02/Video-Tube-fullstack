import { useDispatch, useSelector } from "react-redux";
import { toggleVideoLike } from "../features/like/likeSlice";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const LikeButton = ({ video }) => {
  const dispatch = useDispatch();
  const videoId = video._id;

  const { likedVideoIds, videoLikeCounts } = useSelector((state) => state.like);
  const liked = likedVideoIds.includes(videoId);
  const likeCount = videoLikeCounts[videoId] ?? video.likes; // fallback to original

  const handleLikeToggle = () => {
    dispatch(toggleVideoLike(videoId));
  };

  return (
    <button onClick={handleLikeToggle} className="flex items-center space-x-1">
      <span>{likeCount}</span>
      {liked ? (
        <AiFillLike className="text-white" size={20} />
      ) : (
        <AiOutlineLike size={20} />
      )}
      <span>{liked ? "Liked" : "Like"}</span>
    </button>
  );
};

export default LikeButton;
