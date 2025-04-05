import React, { FC, memo, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Text from './Text';
import { colors } from '../../utils/colors';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export interface CustomButton extends TouchableOpacityProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'text';
  onPress: () => void;
}

const Button: FC<CustomButton> = ({
  style,
  textStyle,
  text,
  variant = 'primary',
  disabled,
  ...rest
}) => {
  const stylesByVariant = useMemo(() => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.primary, color: colors.white };
      case 'text':
        return { color: colors.primary };
      default:
        return { color: colors.primary };
    }
  }, [variant]);

  if (variant === 'text') {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        {...rest}
        style={[styles.textButton, disabled && styles.disabled, style]}>
        <Text fontSize={16} style={[styles.text, { color: stylesByVariant.color }, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} {...rest}>
      <View
        style={[
          styles.base,
          disabled && styles.disabled,
          { backgroundColor: stylesByVariant.backgroundColor },
          style,
        ]}>
        <Text fontSize={16} style={[styles.text, { color: stylesByVariant.color }, textStyle]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(11),
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(50),
  },
  textButton: {
    borderBottomColor: 'rgba(255, 255, 255, 0.37)',
    paddingVertical: verticalScale(3),
    borderBottomWidth: verticalScale(1),
  },
  disabled: { opacity: 0.5 },
  text: { textAlign: 'center', fontWeight: '500', lineHeight: verticalScale(16) },
});

export default memo(Button);
