import { RootState } from '../reducers';

export const getMeSelector = (state: RootState) => state.user.user;
export const getMessagesSelector = (state: RootState) => state.user.messages;
