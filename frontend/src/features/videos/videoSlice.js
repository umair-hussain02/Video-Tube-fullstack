import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videoApi from "./videoApi";

// Actions
export const getAllvideos = createAsyncThunk(
  "videos/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await videoApi.fecthAllVideos();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in Fetching Videos"
      );
    }
  }
);

export const searchvideos = createAsyncThunk(
  "videos/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await videoApi.searchVideos(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in searching Videos"
      );
    }
  }
);

export const getUserVideos = createAsyncThunk(
  "videos/getUserVideos",
  async (userName, { rejectWithValue }) => {
    try {
      const res = await videoApi.fecthUserVideos(userName);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in Fetching User Videos"
      );
    }
  }
);

export const addVideo = createAsyncThunk(
  "/videos/publish-video",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await videoApi.publishVideo(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in Publishing Videos"
      );
    }
  }
);

export const toggleVideoPublish = createAsyncThunk(
  "videos/togglePublish",
  async (videoId, { rejectWithValue }) => {
    try {
      const res = await videoApi.toggleVideoPublish(videoId);
      return { videoId, updatedVideo: res.data.data }; // assuming data structure is { data: { updated video } }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error toggling video publish status"
      );
    }
  }
);

export const removeVideo = createAsyncThunk(
  "/videos/delete-Video",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await videoApi.deleteVideo(videoId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in Deleting Videos"
      );
    }
  }
);

const editVideo = createAsyncThunk(
  "/videos/editvideo",
  async ({ videoId, formData }, { rejectWithValue }) => {
    try {
      const response = await videoApi.updateVideo(videoId, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in edit Videos"
      );
    }
  }
);

const initialState = {
  videos: [],
  userVideos: [],
  error: null,
  total: 0,
  loading: false,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Videos
      .addCase(getAllvideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllvideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data.videos;
        state.total = action.payload.data.total;
      })
      .addCase(getAllvideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Search Videos
      .addCase(searchvideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchvideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.data.videos;
        state.total = action.payload.data.total;
      })
      .addCase(searchvideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // User Videos
      .addCase(getUserVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.userVideos = action.payload.data.videos;
      })
      .addCase(getUserVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Videos
      .addCase(addVideo.fulfilled, (state, action) => {
        state.videos.unshift(action.payload.data);
      })
      // Toggle Publish Status
      .addCase(toggleVideoPublish.fulfilled, (state, action) => {
        const updatedVideo = action.payload;
        const index = state.videos.findIndex((v) => v._id === updatedVideo._id);
        if (index !== -1) {
          state.videos[index].isPublished = updatedVideo.isPublished;
        }
      })
      .addCase(toggleVideoPublish.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete Videos
      .addCase(removeVideo.fulfilled, (state, action) => {
        state.videos = state.videos.filter(
          (video) => video._id !== action.meta.arg
        );
      })
      // Edit Video information
      .addCase(editVideo.fulfilled, (state, action) => {
        const index = state.videos.findIndex(
          (v) => v._id === action.payload.data._id
        );
        if (index !== -1) state.videos[index] = action.payload.data;
      });
  },
});

export default videoSlice.reducer;
