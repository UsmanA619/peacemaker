import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  isAuthenticated: boolean;
  data: object;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

const initialState: InitialState = {
  isAuthenticated: false,
  data: {},
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.tokens.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.tokens.refreshToken = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {setAuthenticated, setUserData, setAccessToken, setRefreshToken} =
  userSlice.actions;
