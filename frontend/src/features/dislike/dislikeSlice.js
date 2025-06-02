import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dislikeApi from "./dislikeApi";

// Toggle Video Dislike
export const toggleVideoDislike = createAsyncThunk(
  "dislike/toggleVideoDislike",
  async (videoId, { rejectWithValue }) => {
    try {
      const res = await dislikeApi.toggleVideoDislike(videoId);
      return {
        videoId,
        disliked: res.data.data.disliked,
        dislikeCount: res.data.data.dislikeCount,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error toggling dislike"
      );
    }
  }
);

// Toggle Comment or Tweet Dislike
export const toggleCommentOrTweetDislike = createAsyncThunk(
  "dislike/toggleCommentOrTweetDislike",
  async ({ type, id }, { rejectWithValue }) => {
    try {
      if (type === "comment") {
        const res = await dislikeApi.toggleCommentDislike(id);
        return { ...res.data.data, id, type };
      } else if (type === "tweet") {
        const res = await dislikeApi.toggleTweetDislike(id);
        return { ...res.data.data, id, type };
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || `Error toggling ${type} dislike`
      );
    }
  }
);

// Get Disliked Videos
export const getDislikedVideos = createAsyncThunk(
  "dislike/getDislikedVideos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await dislikeApi.getDislikedVideos();
      return res.data; // expect { data: { dislikedVideos: [...] } }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching disliked videos"
      );
    }
  }
);

const initialState = {
  dislikedVideoIds: [],
  videoDislikeCounts: {},
  dislikedTweetIds: [],
  dislikedCommentIds: [],
  loading: false,
  error: null,
};

const dislikeSlice = createSlice({
  name: "dislike",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Disliked Videos
      .addCase(getDislikedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDislikedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.dislikedVideoIds = action.payload.data.data.dislikedVideos.map(
          (video) => video._id
        );
      })

      .addCase(getDislikedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Video Dislike
      .addCase(toggleVideoDislike.fulfilled, (state, action) => {
        const { videoId, disliked, dislikeCount } = action.payload;

        if (disliked) {
          if (!state.dislikedVideoIds.includes(videoId)) {
            state.dislikedVideoIds.push(videoId);
          }
        } else {
          state.dislikedVideoIds = state.dislikedVideoIds.filter(
            (id) => id !== videoId
          );
        }
        state.videoDislikeCounts[videoId] = dislikeCount;
      })

      // Toggle Tweet/Comment Dislike
      .addCase(toggleCommentOrTweetDislike.fulfilled, (state, action) => {
        const { id, disliked, type } = action.payload;
        const target =
          type === "comment" ? "dislikedCommentIds" : "dislikedTweetIds";

        if (disliked) {
          if (!state[target].includes(id)) {
            state[target].push(id);
          }
        } else {
          state[target] = state[target].filter((x) => x !== id);
        }
      });
  },
});

export default dislikeSlice.reducer;
