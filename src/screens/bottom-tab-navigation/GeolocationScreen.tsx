import React, { ElementRef, Suspense, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LocationIcon from '../../assets/icons/LocationIcon.svg';
import IconButton from '../../components/atom/IconButton';
import Loading from '../../components/atom/Loading';
import Text from '../../components/atom/Text';
import Screen from '../../components/organism/Screen';
import { setGlobalLoading, useAppDispatch } from '../../store';
import { colors } from '../../utils/colors';
import { moderateScale, verticalScale } from '../../utils/scale';

const MapView = React.lazy(() => import('react-native-maps'));
const Marker = React.lazy(() =>
  import('react-native-maps').then(module => ({ default: module.Marker })),
);

type LocationState = { latitude: number; longitude: number };

const DEFAULT_LOCATION = {
  latitude: 40.1792,
  longitude: 44.4991,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const GeolocationScreen = () => {
  const mapRef = useRef<ElementRef<typeof MapView>>(null);
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<LocationState>(DEFAULT_LOCATION);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Permission error', err?.toString());
        return false;
      }
    }
    return true;
  };

  const getLocation = async () => {
    dispatch(setGlobalLoading(true));
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setErrorMsg('Location permission denied');
      dispatch(setGlobalLoading(false));
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newLocation = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setLocation(newLocation);

        if (mapRef.current) {
          mapRef.current.animateToRegion(newLocation, 1000);
        }
        dispatch(setGlobalLoading(false));
        setErrorMsg('');
      },
      error => {
        setErrorMsg(error.message);
        dispatch(setGlobalLoading(false));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  return (
    <Screen
      withHeader
      edges={['top']}
      barStyle="light-content"
      style={styles.base}
      safeAreaStyles={styles.safeAreaStyles}>
      <IconButton Icon={<LocationIcon width={24} />} onPress={getLocation} />
      <View style={styles.textContainer}>
        <Text>Latitude: {location.latitude}</Text>
        <Text>Longitude: {location.longitude}</Text>
      </View>
      {Platform.OS === 'ios' && (
        <Suspense fallback={<Loading visible />}>
          <MapView ref={mapRef} style={styles.map} initialRegion={DEFAULT_LOCATION}>
            <Marker coordinate={location} title="Your Location" />
          </MapView>
        </Suspense>
      )}
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeAreaStyles: { backgroundColor: colors.primary },
  base: { paddingVertical: verticalScale(15) },
  textContainer: { paddingTop: moderateScale(10) },
  map: {
    paddingVertical: verticalScale(10),
    width: '100%',
    height: verticalScale(250),
    borderRadius: moderateScale(12),
  },
  error: { color: colors.danger, paddingTop: moderateScale(20) },
});

export default GeolocationScreen;
