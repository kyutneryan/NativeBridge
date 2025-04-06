import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LogoutIcon from '../../assets/icons/LogoutIcon.svg';
import MessagesIcon from '../../assets/icons/MessagesIcon.svg';
import { BottomTabStackParams } from '../../navigation/BottomTabNavigation';
import { MainNavigatorProp, MainStackParams } from '../../navigation/MainNavigation';
import { useAppDispatch } from '../../store';
import { resetAllState } from '../../store/reducers';
import { colors } from '../../utils/colors';
import IconButton from '../atom/IconButton';
import Text from '../atom/Text';
import Header from '../molecule/Header';

interface Props {
  hasBack?: boolean;
}

type RouteName = keyof (BottomTabStackParams & MainStackParams);

const MainHeader: FC<Props> = ({ hasBack = false }) => {
  const route = useRoute<RouteProp<BottomTabStackParams>>();
  const navigation = useNavigation<MainNavigatorProp<'BottomTabNavigation'>>();
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(resetAllState());
  }, [dispatch]);

  const renderLeftComponent = useCallback(
    (routeName: RouteName) => {
      switch (routeName) {
        case 'GeolocationScreen':
          return <IconButton Icon={<LogoutIcon width={24} height={24} />} onPress={logout} />;
        default:
          return null;
      }
    },
    [logout],
  );

  const renderRightComponent = useCallback(
    (routeName: RouteName) => {
      switch (routeName) {
        case 'GeolocationScreen':
          return (
            <IconButton
              Icon={<MessagesIcon width={24} height={24} />}
              onPress={() => navigation.navigate('MessagingScreen')}
            />
          );
        default:
          return null;
      }
    },
    [navigation],
  );

  const renderCenterComponent = useCallback((routeName: RouteName) => {
    let name = '';

    switch (routeName) {
      case 'GeolocationScreen':
        name = 'GEOLOCATION';
        break;
      case 'MessagingScreen':
        name = 'MESSAGING';
        break;
      default:
        name = '';
        break;
    }

    return <Text style={styles.heading}>{name}</Text>;
  }, []);

  return (
    <Header
      style={styles.header}
      hasBack={hasBack}
      LeftComponent={renderLeftComponent(route.name)}
      RightComponent={renderRightComponent(route.name)}
      CenterComponent={renderCenterComponent(route.name)}
    />
  );
};

const styles = StyleSheet.create({
  header: { backgroundColor: colors.primary },
  heading: { color: colors.white, fontWeight: '600' },
});

export default MainHeader;
