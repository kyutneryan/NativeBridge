import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, NativeModules, StyleSheet, View } from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import SendIcon from '../../assets/icons/SendIcon.svg';
import { Maybe } from '../../models/common';
import { MessageFormData } from '../../models/formData';
import { setMessage, useAppDispatch } from '../../store';
import { colors } from '../../utils/colors';
import { verticalScale } from '../../utils/scale';
import TextInput from '../atom/TextInput';

const { MessageModule } = NativeModules;

const MessageInput = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<Maybe<NodeJS.Timeout>>(null);
  const [bottom, setBottom] = useState<number>(insets.bottom);

  const { control, setValue, handleSubmit } = useForm<MessageFormData>({
    defaultValues: { text: '' },
  });

  const sendMessage: SubmitHandler<MessageFormData> = async ({ text }) => {
    const message = text.trim();
    if (!message) {
      return;
    }

    dispatch(setMessage({ id: uuid.v4(), text: message, from: 'user', color: colors.primary }));

    MessageModule.sendMessage(message)
      .then((result: string) => {
        timeoutRef.current = setTimeout(() => {
          dispatch(
            setMessage({ id: uuid.v4(), text: result, from: 'native', color: colors.success }),
          );
        }, 500);
      })
      .catch((e: Error) => {
        console.log(e);
        dispatch(
          setMessage({
            id: uuid.v4(),
            text: 'Error communicating with native module.',
            from: 'native',
            color: colors.danger,
          }),
        );
      })
      .finally(() => {
        setValue('text', '');
      });
  };

  useEffect(() => {
    const willShow = Keyboard.addListener('keyboardWillShow', () => {
      setBottom(verticalScale(10));
    });

    const willHide = Keyboard.addListener('keyboardWillHide', () => {
      setBottom(insets.bottom);
    });

    return () => {
      willShow.remove();
      willHide.remove();
    };
  }, [insets.bottom]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={[styles.bottomInputContainer, { paddingBottom: bottom }]}>
      <Controller
        name="text"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="What do you think?"
            wrapperStyle={styles.inputContainer}
            value={value}
            Icon={<SendIcon width={24} height={24} />}
            onIconPress={handleSubmit(sendMessage)}
            onChangeText={onChange}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    bottom: 0,
  },
  inputContainer: {
    backgroundColor: colors.white,
  },
});

export default MessageInput;
