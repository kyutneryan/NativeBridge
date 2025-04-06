import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MessageInput from '../../components/molecule/MessageInput';
import MessageList from '../../components/organism/MessageList';
import Screen from '../../components/organism/Screen';
import { colors } from '../../utils/colors';
import { HEADER_HEIGHT } from '../../utils/constants';

const MessagingScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Screen
      withHeader
      hasBack
      edges={['top']}
      barStyle="light-content"
      safeAreaStyles={styles.safeAreaStyles}>
      <KeyboardAvoidingView
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? HEADER_HEIGHT + insets.top : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <MessageList />
        <MessageInput />
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeAreaStyles: { backgroundColor: colors.primary },
});

export default MessagingScreen;
