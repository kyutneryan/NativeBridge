import React, { FC, JSX, useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import IconButton from './IconButton';
import Text from './Text';
import { colors } from '../../utils/colors';
import { HORIZONTAL_PADDING, WINDOW_WIDTH } from '../../utils/constants';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

interface Props extends TextInputProps {
  label?: string;
  hasError?: boolean;
  labelColor?: string;
  Icon?: JSX.Element;
  onIconPress?: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
  baseStyle?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  error?: (string | undefined)[];
}

const Input: FC<Props> = ({
  label,
  secureTextEntry = false,
  hasError = false,
  Icon,
  wrapperStyle,
  baseStyle,
  onLayout,
  onIconPress,
  style,
  labelColor,
  error,
  ...rest
}) => {
  const [borderColor, setBorderColor] = useState<string>(colors.blackOpacity);

  const onFocus = useCallback(() => setBorderColor(colors.black), []);
  const onBlur = useCallback(() => setBorderColor(colors.blackOpacity), []);

  return (
    <View style={[styles.base, baseStyle]} onLayout={onLayout}>
      {!!label && (
        <Text style={[styles.label, { ...(labelColor ? { color: labelColor } : {}) }]}>
          {label}
        </Text>
      )}
      <View
        style={[styles.wrapper, { borderColor }, hasError && styles.wrapperError, wrapperStyle]}>
        <TextInput
          spellCheck={false}
          style={[
            styles.input,
            hasError && styles.inputError,
            (Icon || secureTextEntry) && styles.inputWithIcon,
            style,
          ]}
          placeholderTextColor={hasError ? colors.dangerOpacity : colors.blackOpacity}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
        {!!Icon && <IconButton onPress={onIconPress} Icon={Icon} />}
      </View>
      {hasError && !!error && renderErrorMessages(error)}
    </View>
  );
};

export const renderErrorMessages = (error: (string | undefined)[]) => {
  return error?.map((message, idx) => {
    if (!message) {
      return null;
    }
    return (
      <View key={idx} style={styles.errorItems}>
        <Text fontSize={16} style={styles.bullet}>
          •
        </Text>
        <Text fontSize={14} style={styles.errorText}>
          {message}
        </Text>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  base: { width: '100%' },
  label: { paddingBottom: verticalScale(12), lineHeight: moderateScale(19) },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: verticalScale(56),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: moderateScale(50),
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(16),
  },
  input: {
    width: '100%',
    fontSize: moderateScale(16),
    color: colors.black,
    height: '100%',
    fontWeight: '300',
  },
  wrapperError: { borderColor: colors.danger },
  inputWithIcon: { flex: 1 },
  inputError: { color: colors.danger },
  errorItems: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(6),
    width: WINDOW_WIDTH - HORIZONTAL_PADDING * 2,
  },
  bullet: { color: colors.danger, paddingRight: horizontalScale(8) },
  errorText: {
    color: colors.danger,
    fontStyle: 'italic',
    lineHeight: verticalScale(16),
  },
});
export default Input;
