import { FC, PropsWithChildren } from 'react';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Screen from './Screen';
import { HORIZONTAL_PADDING } from '../../utils/constants';
import { verticalScale } from '../../utils/scale';
import Button, { CustomButton } from '../atom/Button';
import AuthHeader from '../molecule/AuthHeader';

interface Props extends PropsWithChildren {
  heading: string;
  btnProps: CustomButton;
}

const AuthWrapper: FC<Props> = ({ heading, children, btnProps }) => {
  return (
    <Screen edges={['left', 'right', 'bottom']} style={styles.screen}>
      <AuthHeader title={heading} />
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.base}>
          <View>{children}</View>
        </ScrollView>
        <View style={styles.btnWrapper}>
          <Button {...btnProps} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0 },
  wrapper: { flex: 1, paddingHorizontal: HORIZONTAL_PADDING },
  base: { flexGrow: 1, paddingVertical: verticalScale(24), justifyContent: 'space-between' },
  btnWrapper: { paddingVertical: verticalScale(15) },
});

export default AuthWrapper;
