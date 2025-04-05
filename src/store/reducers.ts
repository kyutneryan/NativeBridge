import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer, { authInitialState } from './auth/slice';
import CommonReducer, { commonInitialState } from './common/slice';
import UserReducer, { userInitialState } from './user/slice';

const appReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  common: CommonReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const RESET_ALL = 'RESET_ALL';

export const resetAllState = () => ({
  type: RESET_ALL as typeof RESET_ALL,
});

const rootReducer = (state: RootState | undefined, action: { type: string }) => {
  if (action.type === RESET_ALL) {
    return {
      auth: authInitialState,
      user: userInitialState,
      common: commonInitialState,
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
