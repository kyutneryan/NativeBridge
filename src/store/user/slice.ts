import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, Maybe } from '../../models/common';

interface UserState {
  user: Maybe<IUser>;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
