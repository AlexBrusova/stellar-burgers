import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const apiGetUser = createAsyncThunk('user/getuser', async () => {
  const response = await getUserApi();
  return response;
});
export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response;
  }
);
export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return response;
  }
);
export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    return response;
  }
);
export const logout = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  return response;
});

type TUserStore = {
  isAuthed: boolean;
  user: TUser;
  error: string | undefined;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthed: false,
    user: {},
    error: ''
  } as TUserStore,
  reducers: {},
  selectors: {
    isAuthedSelector: (state) => state.isAuthed,
    getUser: (state) => state.user,
    getUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthed = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(register.pending, (state) => {
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthed = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthed = false;
        state.error = action.error.message!;
      })
      .addCase(login.pending, (state) => {
        state.isAuthed = false;
        state.error = '';
      })
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthed = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthed = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthed = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthed = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthed = false;
        state.user = { email: '', name: '' };
      });
  }
});

export const { isAuthedSelector, getUser, getUserError } = userSlice.selectors;
export const userReducer = userSlice.reducer;
