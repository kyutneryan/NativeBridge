import { RootState } from '../reducers';

export const getIsLoading = (state: RootState) => state.common.isLoading;
