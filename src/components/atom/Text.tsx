import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../../utils/colors';
import { moderateScale } from '../../utils/scale';

export interface CustomTextProps extends TextProps {
  fontSize?: number;
}

const TextComponent: FC<CustomTextProps> = ({ fontSize = 16, style, ...rest }) => {
  return (
    <Text
      adjustsFontSizeToFit={true}
      style={[styles.base, { fontSize: moderateScale(fontSize) }, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    color: colors.black,
    fontWeight: '400',
  },
});

export default TextComponent;
