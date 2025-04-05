import React, { FC, memo, PropsWithChildren } from 'react';
import { StatusBar, StatusBarStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/colors';
import { HORIZONTAL_PADDING } from '../../utils/constants';

interface Props {
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  safeAreaStyles?: StyleProp<ViewStyle>;
  barStyle?: StatusBarStyle | null;
}

const Screen: FC<PropsWithChildren<Props>> = ({
  edges,
  children,
  style,
  safeAreaStyles,
  barStyle = 'dark-content',
}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.base, safeAreaStyles]}>
      <StatusBar barStyle={barStyle} />
      <View style={[styles.child, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.white },
  child: { flex: 1, paddingHorizontal: HORIZONTAL_PADDING },
});

export default memo(Screen);
