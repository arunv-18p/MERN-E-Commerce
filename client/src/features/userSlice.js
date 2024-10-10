import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../configs/axios";
import { getSplitItems } from "../utils/ArrayUtils";

const initialState = {
  currentUser: null,
  loading: false,
  errorType: null,
  errorMessage: null,
  isAuthenticated: false,
  isAdmin: false,
  allUsers: [],
  splitUsers: [],
};

export const loginUser = createAsyncThunk("users/loginUser", async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const registerUser = createAsyncThunk("users/registerUser", async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  try {
    const response = await axiosInstance.get("/api/v1/users/me/logout", {
      withCredentials: true,
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const getCurrentUser = createAsyncThunk("users/currentUser", async () => {
  try {
    const response = await axiosInstance.get("/api/v1/users/me", {
      withCredentials: true,
    });
    return response.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const changeUserPassword = createAsyncThunk("users/changePassword", async (passwords) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/me/password/change", passwords, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const updateUserProfile = createAsyncThunk("/users/updateUserProfile", async (userData) => {
  try {
    const response = await axiosInstance.put("/api/v1/users/me/update", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const getAllUsers = createAsyncThunk("/users/all", async () => {
  try {
    const response = await axiosInstance.get("/api/v1/users/admin/all", {
      withCredentials: true,
    });
    return response.data.users;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS";

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CLEAR_USER_ERRORS, (state) => {
      state.errorType = null;
      state.errorMessage = null;
    });

    // getCurrentUser - /api/v1/users/me
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = action.payload != null;
      state.isAdmin = action.payload != null && action.payload.role === "admin";
      state.loading = false;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.errorType = "getCurrentUserError";
      state.errorMessage = action.error.message;
      state.loading = false;
    });

    // loginUser - /api/v1/users/login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.isAdmin = action.payload.role === "admin";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.errorType = "loginError";
      state.errorMessage = action.error.message;
      state.loading = false;
    });

    // registerUser - /api/v1/users/register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = action.payload != null;
      state.isAdmin = action.payload.role === "admin";
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorType = "registerUserError";
      state.errorMessage = action.error.message;
      state.loading = false;
    });

    // logoutUser - /api/v1/users/me/logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.currentUser = null;
      state.isAdmin = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.errorType = "logoutUserError";
      state.errorMessage = action.error.message;
      state.loading = false;
    });

    // getAllUsers - /api/v1/users/admin/all

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
      state.splitUsers = getSplitItems(action.payload, 10);
      state.loading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.errorType = "getAllUsersError";
      state.errorMessage = action.error.message;
      state.loading = false;
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.errorType = "updateUserProfileError";
      state.errorMessage = action.error.message;
      state.loading = false;
    });
  },
});

export const getUserSlice = (state) => state.userSlice;

export default userSlice.reducer;
