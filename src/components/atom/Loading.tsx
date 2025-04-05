import React, { FC, memo } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { colors } from '../../utils/colors';

interface Props {
  visible: boolean;
}

const Loading: FC<Props> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal visible transparent>
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: `${colors.primary}80`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Loading);
