import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Text from '../components/atom/Text';

export type MainStackParams = {
  BottomTabNavigation: undefined;
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
      <Screen name="BottomTabNavigation" component={() => <Text>aasdasdsd</Text>} />
    </Navigator>
  );
};

export default memo(MainNavigation);
