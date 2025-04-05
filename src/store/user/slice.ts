import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Maybe } from '../../models/common';

interface UserState {
  user: Maybe<any>;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
