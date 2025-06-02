// features/playlist/playlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "./playlistApi";

export const createPlaylist = createAsyncThunk(
  "playlist/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await playlistApi.create(payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getUserPlaylists = createAsyncThunk(
  "playlist/getUserPlaylists",
  async ({ username, page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await playlistApi.getUserPlaylists(
        username,
        page,
        limit
      );
      console.log(username);

      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getPlaylistById = createAsyncThunk(
  "playlist/getById",
  async (playlistId, { rejectWithValue }) => {
    try {
      const { data } = await playlistApi.getById(playlistId);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updatePlaylist = createAsyncThunk(
  "playlist/update",
  async ({ playlistId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await playlistApi.update(playlistId, payload);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "playlist/delete",
  async (playlistId, { rejectWithValue }) => {
    try {
      await playlistApi.delete(playlistId);
      return playlistId;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideo",
  async ({ playlistId, videoId }, { rejectWithValue }) => {
    try {
      const { data } = await playlistApi.addVideo(playlistId, videoId);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "playlist/removeVideo",
  async ({ playlistId, videoId }, { rejectWithValue }) => {
    try {
      const { data } = await playlistApi.removeVideo(playlistId, videoId);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlists: [],
    userPlaylists: [],
    currentPlaylist: null,
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.unshift(action.payload);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.userPlaylists = action.payload.playlists;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlaylist = action.payload;
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.currentPlaylist = action.payload;
      })

      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.playlists = state.playlists.filter(
          (p) => p._id !== action.payload
        );
      })

      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.currentPlaylist = action.payload;
      })

      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.currentPlaylist = action.payload;
      });
  },
});

export default playlistSlice.reducer;
