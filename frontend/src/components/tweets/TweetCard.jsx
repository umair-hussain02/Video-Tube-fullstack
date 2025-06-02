import agoTime from "../../features/agoTime";
import CommentTweetLikeButton from "../CommentTweetLikeButton";

function TweetCard({ tweet }) {
  return (
    <div className=" border-b border-gray-800 pb-4">
      <div className="flex items-center space-x-3 mb-1">
        <img
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
          height="40"
          src={tweet.owner.avatar}
          width="40"
        />
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold text-white">
            {tweet.owner.userName}
          </span>
          <span className="text-gray-400">{agoTime(tweet.createdAt)}</span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-white">
        {tweet.content}
        {/* <span> 💡</span> #JavaScript #ES11 */}
      </p>
      {tweet.likes}
      <CommentTweetLikeButton type={"tweet"} id={tweet._id} />
    </div>
  );
}

export default TweetCard;
