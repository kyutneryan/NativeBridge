import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import { object as yupObject, string as yupString } from 'yup';
import TextInput from '../../components/atom/TextInput';
import AuthWrapper from '../../components/organism/AuthWrapper';
import { AuthFormData } from '../../models/formData';
import { setIsLoggedIn, setToken, setUser, useAppDispatch } from '../../store';

const loginSchema = yupObject({
  email: yupString().email().required('Email is required'),
});
const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AuthFormData> = useCallback(
    data => {
      Keyboard.dismiss();
      dispatch(setUser(data));
      dispatch(setToken(uuid.v4()));
      dispatch(setIsLoggedIn());
    },
    [dispatch],
  );

  const { control, handleSubmit } = useForm<AuthFormData>({
    defaultValues: { email: '' },
    resolver: yupResolver(loginSchema),
  });

  return (
    <AuthWrapper heading={'Login'} btnProps={{ text: 'Login', onPress: handleSubmit(onSubmit) }}>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            label={'Email'}
            placeholder={'Enter your email'}
            value={value}
            hasError={!!error}
            error={[error?.message || '']}
            keyboardType="email-address"
            onChangeText={onChange}
          />
        )}
      />
    </AuthWrapper>
  );
};

export default LoginScreen;
