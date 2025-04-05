import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;
// Based on iphone 6s screen size

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
