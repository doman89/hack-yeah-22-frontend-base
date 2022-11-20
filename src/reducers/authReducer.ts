import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthUser = {
  token: string;
};

type AuthState = {
  authUser: AuthUser;
};

const defaultState: AuthState = {
  authUser: { token: "" },
};

const slice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<AuthUser>) => {
      state.authUser = payload;
    },
  },
});

export const { setToken } = slice.actions;

export const { reducer: authReducer } = slice;
