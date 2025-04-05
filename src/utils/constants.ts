import { Dimensions } from 'react-native';
import { horizontalScale, verticalScale } from './scale';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export const HEADER_HEIGHT = verticalScale(56);
export const HORIZONTAL_PADDING = horizontalScale(16);
