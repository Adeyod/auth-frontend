import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: localStorage.getItem
    ? JSON.parse(localStorage.getItem('currentUser'))
    : null,
  loading: false,
  message: '',
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      console.log(action);
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = false;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutSuccess: (state) => {
      state.currentUser = null;
      // localStorage.removeItem('currentUser');
      localStorage.clear('currentUser');
      state.error = false;
    },

    registerStart: (state) => {
      state.loading = true;
    },

    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = false;
    },

    registerFailure: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = true;
    },
  },
});

export const {
  registerFailure,
  registerStart,
  registerSuccess,
  logoutSuccess,
  loginStart,
  loginFailure,
  loginSuccess,
} = userSlice.actions;

export default userSlice.reducer;
