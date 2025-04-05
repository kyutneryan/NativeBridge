import React, { FC, JSX, memo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Text from './Text';
import { horizontalScale, moderateScale } from '../../utils/scale';

interface Props extends TouchableOpacityProps {
  Icon: JSX.Element;
  text?: string;
}

const IconButton: FC<Props> = ({ Icon, text, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      style={[styles.base, rest.disabled && styles.disabled, rest.style]}>
      <View style={styles.iconWithText}>
        <View style={styles.icon}>{Icon}</View>
        {text && <Text>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(48),
    height: moderateScale(48),
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: horizontalScale(24),
  },
  disabled: { opacity: 0.4 },
});

export default memo(IconButton);
