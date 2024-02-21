import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      state.loading = false;
      state.error = false;
      state.currentUser = null;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedChannels.includes(action.payload)) {
        state.currentUser.subscribedChannels.splice(
          state.currentUser.subscribedChannels.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedChannels.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logOut, subscription } =
  userSlice.actions;

export default userSlice.reducer;
