import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import likeApi from "./likeApi";

export const toggleVideoLike = createAsyncThunk(
  "like/toggleVideoLike",
  async (videoId, { rejectWithValue }) => {
    try {
      const res = await likeApi.toggleVideoLike(videoId);
      return {
        videoId,
        liked: res.data.data.liked,
        likeCount: res.data.data.likeCount,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error toggling like"
      );
    }
  }
);

export const toggleCommentOrTweetLike = createAsyncThunk(
  "like/toggleCommentOrTweetLike",
  async ({ type, id }, { rejectWithValue }) => {
    try {
      if (type === "comment") {
        const res = await likeApi.toggleCommentLike(id);
        return { ...res.data.data, id, type };
      } else if (type === "tweet") {
        const res = await likeApi.toggleTweetLike(id);
        return { ...res.data.data, id, type };
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || `Error toggling ${type} like`
      );
    }
  }
);

export const getLikedVideos = createAsyncThunk(
  "like/getLikedVideos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await likeApi.getLikedVideos();
      //   console.log(res.data.data.likedVideos);

      return res.data; // assuming res.data = { videos: [...] }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching liked videos"
      );
    }
  }
);

const initialState = {
  likedVideoIds: [],
  videoLikeCounts: {},
  likedTweetIds: [],
  likedCommentIds: [],
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.likedVideoIds = action.payload.data.likedVideos;
      })
      .addCase(getLikedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Video Likes
      .addCase(toggleVideoLike.fulfilled, (state, action) => {
        const { videoId, liked, likeCount } = action.payload;

        if (liked) {
          if (!state.likedVideoIds.includes(videoId)) {
            state.likedVideoIds.push(videoId);
          }
        } else {
          state.likedVideoIds = state.likedVideoIds.filter(
            (id) => id !== videoId
          );
        }
        state.videoLikeCounts[videoId] = likeCount;
      })

      .addCase(toggleCommentOrTweetLike.fulfilled, (state, action) => {
        const { id, liked, type } = action.payload;
        const target = type === "comment" ? "likedCommentIds" : "likedTweetIds";

        if (liked) {
          state[target].push(id);
        } else {
          state[target] = state[target].filter((x) => x !== id);
        }
      });
  },
});

export default likeSlice.reducer;
