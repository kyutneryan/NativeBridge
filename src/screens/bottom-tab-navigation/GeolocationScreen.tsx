import React from 'react';
import { StyleSheet } from 'react-native';
import MainHeader from '../../components/organism/MainHeader';
import Screen from '../../components/organism/Screen';
import { colors } from '../../utils/colors';

const GeolocationScreen = () => {
  return (
    <Screen edges={['top']} barStyle="light-content" safeAreaStyles={styles.safeAreaStyles}>
      <MainHeader />
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeAreaStyles: { backgroundColor: colors.primary },
});

export default GeolocationScreen;
