import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, IUser, Maybe } from '../../models/common';

interface UserState {
  user: Maybe<IUser>;
  messages: IMessage[];
}

export const userInitialState: UserState = {
  user: null,
  messages: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages = [action.payload, ...state.messages];
    },
  },
});

export const { setUser, setMessage } = userSlice.actions;

export default userSlice.reducer;
