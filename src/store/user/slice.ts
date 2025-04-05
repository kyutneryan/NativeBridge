import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, Maybe } from '../../models/common';

interface UserState {
  user: Maybe<IUser>;
}

export const userInitialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
