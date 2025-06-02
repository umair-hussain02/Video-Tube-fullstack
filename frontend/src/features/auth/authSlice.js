import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";

//------------------Actions------------------

// login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

// Get Current User
export const getCurrentUser = createAsyncThunk(
  "auth/get-current-user",
  async (_, { rejectWithValue }) => {
    try {
      const response = authApi.getCurrentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to Fetch User"
      );
    }
  }
);
// logout User
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.logout();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout Failed.."
      );
    }
  }
);
// update account details
export const changeAccountDetails = createAsyncThunk(
  "auth/change-account- details",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authApi.updateAccountDetails(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Fail to update account details..."
      );
    }
  }
);
// change password
export const updatePassword = createAsyncThunk(
  "auth/change-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.changePassword(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Fail to change the password..."
      );
    }
  }
);
//---------------Slice------------------

const initialState = {
  user: JSON.parse(localStorage.getItem("User")) || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.data.user;
        localStorage.setItem("User", JSON.stringify(action.payload.data.user));

        state.refreshToken = action.payload.data.refreshToken;
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.refreshToken = action.payload.data.refreshToken;
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.user);

        state.user = action.payload.user;
        // console.log(action);
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.refreshToken = null;
        localStorage.removeItem("refreshToken");
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.refreshToken = null;
        state.loading = false;
        localStorage.removeItem("User");
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      })
      // Update account
      .addCase(changeAccountDetails.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.data };
      })
      .addCase(changeAccountDetails.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Change password
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.successMessage = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
