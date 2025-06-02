import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import VideoCard from "../components/video/Videocards"; // adjust based on your project
import { useDispatch, useSelector } from "react-redux";
import { searchvideos } from "../features/videos/videoSlice";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const dispatch = useDispatch();
  const { videos, error, loading } = useSelector((state) => state.videos);
  const query = useQuery().get("query") || "";

  useEffect(() => {
    const fetchVideos = (q) => {
      dispatch(searchvideos(q))
        .unwrap()
        .then((data) => console.log("Fetched videos:", data))
        .catch((err) => console.log("Error fetching videos:", err));
    };

    if (query) {
      fetchVideos(query);
    }
  }, [query]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
