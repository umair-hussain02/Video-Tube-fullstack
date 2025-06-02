// src/features/channel/channelSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../features/userProfile/userProfileApi";

// Thunk to fetch channel profile by username
export const fetchChannelProfile = createAsyncThunk(
  "channel/fetchChannelProfile",
  async (username, { rejectWithValue }) => {
    try {
      const response = await userApi.getChannelProfile(username);
      console.log(response);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch channel profile"
      );
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channelProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearChannelError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.channelProfile = action.payload;
      })
      .addCase(fetchChannelProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearChannelError } = channelSlice.actions;
export default channelSlice.reducer;
