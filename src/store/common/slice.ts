import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  isLoading: boolean;
}

const initialState: CommonState = {
  isLoading: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = commonSlice.actions;

export default commonSlice.reducer;
