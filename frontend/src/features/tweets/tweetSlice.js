import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tweetApi from "./tweetApi";

// Thunks

export const allTweets = createAsyncThunk(
  "/tweets/Alltweet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await tweetApi.getAllTweets();
      // console.log(response.data.data.tweets);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in fetching All Tweet..."
      );
    }
  }
);

export const creatTweet = createAsyncThunk(
  "/tweets/create-tweet",
  async (content, { rejectWithValue }) => {
    try {
      const response = await tweetApi.createTweet(content);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in Creating Tweet..."
      );
    }
  }
);

export const fetchUserTweet = createAsyncThunk(
  "/tweets/user-tweets",
  async (username, { rejectWithValue }) => {
    try {
      const response = await tweetApi.getUserTweet(username);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in fetching User Tweets"
      );
    }
  }
);

export const editTweet = createAsyncThunk(
  "/tweets/edit-tweet",
  async ({ tId, content }, { rejectWithValue }) => {
    try {
      const response = await tweetApi.updateTweet(tId, content);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in edit tweet"
      );
    }
  }
);

export const deleteTweet = createAsyncThunk(
  "/tweets/delete-tweet",
  async (tId, { rejectWithValue }) => {
    try {
      const response = await tweetApi.deleteTweet(tId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in deleting tweet"
      );
    }
  }
);

//-----=----------------Slice-----------------
const initialState = {
  error: null,
  loading: false,
  tweets: [],
  userTweets: [],
  total: 0,
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    clearTweetsError: (state) => (state.error = null),
  },
  extraReducers: (builder) => {
    builder
      //All Tweets
      .addCase(allTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(allTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload.data.tweets;
        // console.log(action.payload.data.tweets);

        state.total = action.payload.data.total;
      })
      .addCase(allTweets.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      //create tweet
      .addCase(creatTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(creatTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload.data.data.tweets;
        state.total = action.payload.data.data.total;
      })
      .addCase(creatTweet.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      // Get user tweet
      .addCase(fetchUserTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTweet.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data.tweets);

        state.userTweets = action.payload.data.tweets;
      })
      .addCase(fetchUserTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(editTweet.fulfilled, (state, action) => {
        const index = state.tweets.findIndex(
          (t) => t._id === action.payload.data.tweet._id
        );
        if (index !== -1) {
          state.tweets[index] = action.payload.data.tweet;
        }
      })

      // Delete
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.tweets = state.tweets.filter(
          (t) => t._id !== action.payload.data
        );
      });
  },
});

export const { clearTweetsError } = tweetSlice.actions;
export default tweetSlice.reducer;
