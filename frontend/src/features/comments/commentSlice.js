import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "./commentApi";

// Thunks
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async ({ videoId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await commentApi.getComments(videoId, page, limit);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const response = await commentApi.addComment(videoId, content);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await commentApi.updateComment(commentId, content);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update comment"
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await commentApi.deleteComment(commentId);
      return commentId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    totalComments: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.totalComments = action.payload.totalComments;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
        state.totalComments += 1;
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c._id !== action.payload);
        state.totalComments -= 1;
      });
  },
});

export default commentSlice.reducer;
