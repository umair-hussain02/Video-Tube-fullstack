// features/subscription/subscriptionSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subscriptionApi from "../../features/subscriptions/subscriptionApi";

// Thunks
export const fetchSubscriberList = createAsyncThunk(
  "subscription/fetchSubscriberList",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await subscriptionApi.getSubscriberList(userId);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const toggleSubscription = createAsyncThunk(
  "subscription/toggleSubscription",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await subscriptionApi.toggleSubcription(channelId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchSubscribedChannelList = createAsyncThunk(
  "subscription/fetchSubscribedChannelList",
  async (username, { rejectWithValue }) => {
    try {
      const response = await subscriptionApi.getSubscribedChannelList(username);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const checkSubscriptionStatus = createAsyncThunk(
  "subscription/checkSubscriptionStatus",
  async (channelId, { rejectWithValue }) => {
    try {
      const res = await subscriptionApi.getSubscriptionStatus(channelId);
      return res.data.data.subscribed;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice

const initialState = {
  subscriberList: [],
  subscribedChannels: [],
  isSubscribed: false,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearSubscriptionError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Subscriber List
      .addCase(fetchSubscriberList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriberList.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriberList = action.payload.subscribers;
      })
      .addCase(fetchSubscriberList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Subscription
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.isSubscribed = action.payload?.subscribed ?? !state.isSubscribed;
      })
      .addCase(toggleSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Subscribed Channels
      .addCase(fetchSubscribedChannelList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribedChannelList.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedChannels = action.payload.channels;
      })
      .addCase(fetchSubscribedChannelList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Subscription Status

      .addCase(checkSubscriptionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isSubscribed = action.payload;
      })
      .addCase(checkSubscriptionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubscriptionError } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
