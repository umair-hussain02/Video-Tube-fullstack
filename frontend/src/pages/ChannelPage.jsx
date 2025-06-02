import React, { useEffect, useState } from "react";
import ChannelDetail from "../components/channel/ChannelDetail";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axios-instance";
import ChannelContent from "../components/channel/ChannelContent";

function ChannelPage() {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`/users/c/${username}`);
        setChannel(res.data);
      } catch (err) {
        setError("Fail to Load Video...", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [username]);
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  console.log(channel.data);

  return (
    <>
      <ChannelDetail channel={channel.data} />;
      <ChannelContent userName={username} />
    </>
  );
}

export default ChannelPage;
