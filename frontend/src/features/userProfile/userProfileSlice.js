import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userProfileApi from "./userProfileApi";

// Thunks
export const changeAvatar = createAsyncThunk(
  "/userprofile/change-Avatar",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await userProfileApi.changeAvatar(FormData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Error in Change User Avatar...."
      );
    }
  }
);

export const changeCoverImage = createAsyncThunk(
  "/userprofile/change-coverimage",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await userProfileApi.changeCoverImage(FormData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Error in Change User Cover Image...."
      );
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  successMessage: null,
};

const userProfileSlice = createSlice({
  name: "UserProfile",
  initialState,
  reducers: {
    resetUserProfileState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data; // optional: if you want to store profile
        state.successMessage = action.payload.data.message; // <- shows success message
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Change coverImage

      .addCase(changeCoverImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeCoverImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data; // optional: if you want to store profile
        state.successMessage = action.payload.data.message; // <- shows success message
      })
      .addCase(changeCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUserProfileState } = userProfileSlice.actions;
export default userProfileSlice.reducer;
