import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../../components/organism/Screen';
import { colors } from '../../utils/colors';

const MessagingScreen = () => {
  return (
    <Screen
      withHeader
      hasBack
      edges={['top']}
      barStyle="light-content"
      safeAreaStyles={styles.safeAreaStyles}
    />
  );
};

const styles = StyleSheet.create({
  safeAreaStyles: { backgroundColor: colors.primary },
});

export default MessagingScreen;
