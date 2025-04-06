import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import MessagingScreen from '../screens/bottom-tab-navigation/MessagingScreen';

export type MainStackParams = {
  BottomTabNavigation: undefined;
  MessagingScreen: undefined;
};

export type MainNavigatorProp<T extends keyof MainStackParams> = NativeStackNavigationProp<
  MainStackParams,
  T
>;

export type MainRouteProp<T extends keyof MainStackParams> = RouteProp<MainStackParams, T>;

const { Navigator, Screen } = createNativeStackNavigator<MainStackParams>();

const MainNavigation = () => {
  return (
    <Navigator
      initialRouteName={'BottomTabNavigation'}
      screenOptions={{ orientation: 'portrait', headerShown: false }}>
      <Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      <Screen name="MessagingScreen" component={MessagingScreen} />
    </Navigator>
  );
};

export default MainNavigation;
