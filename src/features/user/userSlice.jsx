import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      user: null,
      token: null,
    }
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.value.user = {
        email: payload.email,
        profileImage: payload.profileImage || null,
      };
      state.value.token = payload.token;
    },
    setProfileImage: (state, { payload }) => {
      if (state.value.user) {
        state.value.user.profileImage = payload;
      }
    },
    clearUser: () => ({
      value: { user: null, token: null }
    }),
  },
});

export const { setUser, clearUser, setProfileImage } = authSlice.actions;
export default authSlice.reducer;