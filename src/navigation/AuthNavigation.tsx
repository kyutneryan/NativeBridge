import React, { FC, memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';

export type AuthStackParams = {
  LoginScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParams>();

export type AuthNavigatorProp<T extends keyof AuthStackParams> = NativeStackNavigationProp<
  AuthStackParams,
  T
>;

export type AuthRouteProp<T extends keyof AuthStackParams> = RouteProp<AuthStackParams, T>;

const AuthNavigator: FC = () => {
  return (
    <Navigator
      initialRouteName={'LoginScreen'}
      screenOptions={{ orientation: 'portrait', headerShown: false }}>
      <Screen name="LoginScreen" component={LoginScreen} />
    </Navigator>
  );
};

export default memo(AuthNavigator);
