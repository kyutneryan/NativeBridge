import React, { FC, memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LogoutIcon from '../../assets/icons/LogoutIcon.svg';
import { BottomTabStackParams } from '../../navigation/BottomTabNavigation';
import { useAppDispatch } from '../../store';
import { resetAllState } from '../../store/reducers';
import { colors } from '../../utils/colors';
import IconButton from '../atom/IconButton';
import Text from '../atom/Text';
import Header from '../molecule/Header';

interface Props {
  hasBack?: boolean;
  hasSearch?: boolean;
}

type RouteName = keyof BottomTabStackParams;

const MainHeader: FC<Props> = ({ hasBack = false }) => {
  const route = useRoute<RouteProp<BottomTabStackParams>>();
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(resetAllState());
  }, [dispatch]);

  const renderLeftComponent = useCallback((routeName: RouteName) => {
    switch (routeName) {
      case 'GeolocationScreen':
      case 'MessagingScreen':
        return null;
      default:
        return null;
    }
  }, []);

  const renderRightComponent = useCallback(
    (routeName: RouteName) => {
      switch (routeName) {
        case 'GeolocationScreen':
        case 'MessagingScreen':
          return (
            <View style={styles.homeRight}>
              <IconButton Icon={<LogoutIcon width={20} />} onPress={logout} />
            </View>
          );
        default:
          return null;
      }
    },
    [logout],
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
  homeRight: { flexDirection: 'row', alignItems: 'center' },
  heading: { color: colors.white, fontWeight: '600' },
});

export default memo(MainHeader);
