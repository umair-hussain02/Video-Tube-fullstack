import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylists } from "../features/playlist/playlistSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PlaylistCard from "../components/playlist/PlaylistCard";

function Playlist() {
  const dispatch = useDispatch();
  const { userPlaylists, error, loading } = useSelector(
    (state) => state.playlist
  );
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      dispatch(getUserPlaylists({ username: user.userName }));
    }
  }, [dispatch, user]);

  const handleRefresh = () => {
    if (user) {
      dispatch(getUserPlaylists({ username: user.userName }));
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <div className="flex justify-between items-center mb-5 ">
        <h2 className=" flex items-center text-2xl font-semibold text-center text-gray-200">
          Your Playlists
        </h2>
        <Link
          to="/create-playlist"
          className="relative group bg-black border text-white py-1 px-5 rounded-lg hover:bg-gray-600 transition duration-300 flex items-center justify-center"
        >
          <CgPlayListAdd size={20} />

          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            Add new playlist
          </span>
        </Link>
      </div>

      {!loading && !error && userPlaylists.length === 0 && (
        <p className="text-center text-gray-200">
          You haven't created any playlists yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
            onUpdate={handleRefresh}
          />
        ))}
      </div>
    </>
  );
}

export default Playlist;
