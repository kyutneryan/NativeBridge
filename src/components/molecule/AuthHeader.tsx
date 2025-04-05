import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../../utils/constants';
import Text from '../atom/Text';

type Props = {
  title: string;
};

const AuthHeader: FC<Props> = ({ title }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={styles.base}>
        <Text fontSize={20}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(AuthHeader);
