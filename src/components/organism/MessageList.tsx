import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getMessagesSelector, useAppSelector } from '../../store';
import { horizontalScale, verticalScale } from '../../utils/scale';
import Text from '../atom/Text';

const MessageList = () => {
  const messages = useAppSelector(getMessagesSelector);

  return (
    <FlatList
      inverted={!!messages.length}
      data={messages}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Text
          style={[
            styles.message,
            item.from === 'user' ? styles.userMessage : styles.nativeMessage,
            { color: item.color },
          ]}>
          {item.from === 'user' ? 'You: ' : 'Native: '}
          {item.text}
        </Text>
      )}
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      maintainVisibleContentPosition={{ autoscrollToTopThreshold: 0, minIndexForVisible: 1 }}
      scrollEventThrottle={16}
      automaticallyAdjustContentInsets={false}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: { paddingHorizontal: horizontalScale(15) },
  listContainer: { paddingVertical: verticalScale(25) },
  message: { fontSize: 16, marginVertical: 4 },
  userMessage: { alignSelf: 'flex-end', color: 'blue' },
  nativeMessage: { alignSelf: 'flex-start', color: 'green' },
});

export default MessageList;
