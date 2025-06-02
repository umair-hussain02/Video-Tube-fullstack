import { useDispatch, useSelector } from "react-redux";
import { toggleVideoDislike } from "../features/dislike/dislikeSlice";
import { BiDislike, BiSolidDislike } from "react-icons/bi";

const DislikeButton = ({ video }) => {
  const dispatch = useDispatch();
  const videoId = video._id;

  const { videoDislikeCounts } = useSelector((state) => state.dislike);
  const disliked = dislikedVideoIds.includes(videoId);
  const dislikeCount = videoDislikeCounts[videoId] ?? video.dislikes; // fallback to original

  const handleDislikeToggle = () => {
    dispatch(getDislikedVideos());
    dispatch(toggleVideoDislike(videoId));
  };

  return (
    <button
      onClick={handleDislikeToggle}
      className="flex items-center space-x-1"
    >
      <span>{dislikeCount}</span>
      {disliked ? (
        <BiSolidDislike className="text-white" size={20} />
      ) : (
        <BiDislike size={20} />
      )}
      <span>{disliked ? "Disliked" : "Dislike"}</span>
    </button>
  );
};

export default DislikeButton;
