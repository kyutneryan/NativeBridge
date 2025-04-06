import React, { FC, memo, PropsWithChildren } from 'react';
import { StatusBar, StatusBarStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from './MainHeader';
import { colors } from '../../utils/colors';
import { HORIZONTAL_PADDING } from '../../utils/constants';

interface Props {
  edges?: Edge[];
  withHeader?: boolean;
  style?: StyleProp<ViewStyle>;
  safeAreaStyles?: StyleProp<ViewStyle>;
  barStyle?: StatusBarStyle | null;
}

const Screen: FC<PropsWithChildren<Props>> = ({
  edges,
  withHeader = false,
  children,
  style,
  safeAreaStyles,
  barStyle = 'dark-content',
}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.base, safeAreaStyles]}>
      <StatusBar barStyle={barStyle} />
      {withHeader ? <MainHeader /> : null}
      <View style={[styles.child, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.white },
  child: { flex: 1, backgroundColor: colors.white, paddingHorizontal: HORIZONTAL_PADDING },
});

export default memo(Screen);
