// src/features/history/historySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import watchHistoryApi from "./watchHistoryApi";

// Thunk to fetch watch history

export const addVideoToWatchHistory = createAsyncThunk(
  "history/addVieotoWatchHistory",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await watchHistoryApi.addVideoToWatchHistory(videoId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch watch history"
      );
    }
  }
);

export const fetchWatchHistory = createAsyncThunk(
  "history/fetchWatchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await watchHistoryApi.getWatchHistory();
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch watch history"
      );
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    watchHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearHistoryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVideoToWatchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideoToWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.watchHistory = action.payload.watchHistory || state.watchHistory;
      })
      .addCase(addVideoToWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWatchHistory.pending, (state) => {
        console.log("Pending...");

        state.loading = true;
      })
      .addCase(fetchWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        state.watchHistory = action.payload;
      })
      .addCase(fetchWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHistoryError } = historySlice.actions;
export default historySlice.reducer;
