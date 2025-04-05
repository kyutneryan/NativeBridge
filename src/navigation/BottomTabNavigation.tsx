import React, { memo, useCallback } from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import GeolocationActiveIcon from '../assets/icons/GeolocationActiveIcon.svg';
import GeolocationIcon from '../assets/icons/GeolocationIcon.svg';
import MessagesActiveIcon from '../assets/icons/MessagesActiveIcon.svg';
import MessagesIcon from '../assets/icons/MessagesIcon.svg';
import Text from '../components/atom/Text';

export type BottomTabStackParams = {
  GeolocationScreen: undefined;
  MessagingScreen: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<BottomTabStackParams>();

export type BottomTabNavigatorProp = BottomTabNavigationProp<
  BottomTabStackParams,
  'GeolocationScreen'
>;

export type BottomTabNavigatorRouteProp<T extends keyof BottomTabStackParams> = RouteProp<
  BottomTabStackParams,
  T
>;

const BottomTabNavigation = () => {
  const renderTabBarIcon = useCallback((icon: keyof BottomTabStackParams) => {
    return ({ focused }: { focused: boolean; color: string; size: number }) => {
      switch (icon) {
        case 'GeolocationScreen':
          return focused ? <GeolocationActiveIcon width={24} /> : <GeolocationIcon width={20} />;
        case 'MessagingScreen':
          return focused ? <MessagesActiveIcon width={24} /> : <MessagesIcon width={20} />;
        default:
          return null;
      }
    };
  }, []);

  return (
    <Navigator
      initialRouteName={'GeolocationScreen'}
      screenOptions={{ lazy: true, headerShown: false }}>
      <Screen
        name="GeolocationScreen"
        options={{
          tabBarLabel: 'Geolocation',
          tabBarIcon: renderTabBarIcon('GeolocationScreen'),
        }}
        component={() => <Text>GeolocationScreen</Text>}
      />
      <Screen
        name="MessagingScreen"
        options={{
          tabBarLabel: 'Messaging',
          tabBarIcon: renderTabBarIcon('MessagingScreen'),
        }}
        component={() => <Text>MessagingScreen</Text>}
      />
    </Navigator>
  );
};

export default memo(BottomTabNavigation);
