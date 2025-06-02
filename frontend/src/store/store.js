import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import videoReducer from "../features/videos/videoSlice";
import tweetReducer from "../features/tweets/tweetSlice";
import userProfileReducer from "../features/userProfile/userProfileSlice";
import subscriptionReducer from "../features/subscriptions/subscriptionSlice";
import LikeReducer from "../features/like/likeSlice";
import commentReducer from "../features/comments/commentSlice";
import channelReducer from "../features/channel/channelSlice";
import playlistReducer from "../features/playlist/playlistSlice";
import watchHistoryReducer from "../features/watchHistory/watchHistorySlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    tweets: tweetReducer,
    userProfile: userProfileReducer,
    subscription: subscriptionReducer,
    like: LikeReducer,
    comment: commentReducer,
    channel: channelReducer,
    playlist: playlistReducer,
    history: watchHistoryReducer,
    sidebar: sidebarReducer,
    dashboard: dashboardReducer,
  },
});
