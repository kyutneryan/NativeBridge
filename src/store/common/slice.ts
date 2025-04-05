import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  isLoading: boolean;
}

export const commonInitialState: CommonState = {
  isLoading: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: commonInitialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = commonSlice.actions;

export default commonSlice.reducer;
