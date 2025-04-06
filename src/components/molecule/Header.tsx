import React, { FC, JSX } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/icons/BackIcon.svg';
import { Maybe } from '../../models/common';
import { HEADER_HEIGHT, HORIZONTAL_PADDING } from '../../utils/constants';
import { moderateScale } from '../../utils/scale';
import IconButton from '../atom/IconButton';

interface Props {
  hasBack?: boolean;
  onBack?: () => void;
  RightComponent?: Maybe<JSX.Element>;
  LeftComponent?: Maybe<JSX.Element>;
  CenterComponent?: Maybe<JSX.Element>;
  style?: StyleProp<ViewStyle>;
}

const Header: FC<Props> = ({
  RightComponent = null,
  LeftComponent = null,
  hasBack = true,
  CenterComponent = null,
  style,
  onBack,
}) => {
  const { goBack } = useNavigation();

  return (
    <View style={[styles.base, style]}>
      <View style={styles.left}>
        {hasBack ? (
          <IconButton Icon={<BackIcon />} style={styles.icon} onPress={onBack || goBack} />
        ) : (
          LeftComponent
        )}
      </View>
      {CenterComponent}
      <View style={styles.right}>{RightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    width: '100%',
    height: HEADER_HEIGHT,
    paddingHorizontal: HORIZONTAL_PADDING,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: { width: moderateScale(24), height: moderateScale(24) },
  right: { flex: 1, alignItems: 'flex-end' },
  left: { flex: 1, zIndex: 1 },
});

export default Header;
