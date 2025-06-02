import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardApi from "./dashboardApi";

// Fetch channel statistics
export const fetchChannelStats = createAsyncThunk(
  "dashboard/fetchChannelStats",
  async (channelId, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.channelStats(channelId);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in Fetching Channel Stats"
      );
    }
  }
);

// Fetch channel videos
export const fetchChannelVideos = createAsyncThunk(
  "dashboard/fetchChannelVideos",
  async (channelId, { rejectWithValue }) => {
    try {
      const res = await dashboardApi.channelVideos(channelId);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error Fetching Channel Videos"
      );
    }
  }
);

// Initial state
const initialState = {
  stats: [],
  videos: [],
  loading: false,
  error: null,
};

// Dashboard slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboardState: (state) => {
      state.stats = [];
      state.videos = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchChannelStats
      .addCase(fetchChannelStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchChannelStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchChannelVideos
      .addCase(fetchChannelVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos;
      })
      .addCase(fetchChannelVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
