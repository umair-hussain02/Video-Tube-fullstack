import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPlaylists } from "../../features/playlist/playlistSlice";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import PlaylistCard from "./PlaylistCard";

function UserPlaylist() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { userPlaylists, error, loading } = useSelector(
    (state) => state.playlist
  );

  useEffect(() => {
    dispatch(getUserPlaylists({ username }));
  }, [dispatch, username]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  return (
    <div>
      {Array.isArray(userPlaylists) && userPlaylists.length > 0 ? (
        userPlaylists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))
      ) : (
        <h1 className="text-2xl text-white">No Playlist available.</h1>
      )}
    </div>
  );
}

export default UserPlaylist;
