import { RootState } from '../main';

export const getIsLoading = (state: RootState) => state.common.isLoading;
export const getToAppointmentsScreen = (state: RootState) => state.common.toAppointmentsScreen;
export const getDraftAppointmentReqData = (state: RootState) =>
  state.common.draftAppointmentReqData;
