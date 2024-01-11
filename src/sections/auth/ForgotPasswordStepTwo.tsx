import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import CustomButton from '../../components/shared/Buttons/CustomButton';
import Input from '../../components/shared/inputs';
import PasswordInput from '../../components/shared/inputs/PasswordInput';
import {useReactHookForm} from '../../hooks/useReactHookForm';
import {resetPassword} from '../../lib/auth';
import {getErrorMessage} from '../../utils/helpers';
import {toastErrorMessage} from '../../utils/toast';
import {
  ChangePasswordDto,
  changePasswordValidation,
} from '../../validations/auth';

interface Props {
  changeStep: (index: number) => void;
}
export default function ForgotPasswordStepTwo({changeStep}: Props) {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useReactHookForm<ChangePasswordDto>({schema: changePasswordValidation});

  const resetPasswordMutation = useMutation({mutationFn: resetPassword});

  const router = useRouter();

  const changePassword = (data: ChangePasswordDto) => {
    console.log(data);
    resetPasswordMutation.mutate(data, {
      onSuccess() {
        router.replace('/(auth)/auth/login');
      },
      onError(error) {
        toastErrorMessage(getErrorMessage(error));
      },
    });
  };
  return (
    <View>
      <Text className="text-primary capitalize text-xl mb-4 font-bold">
        Reset Password
      </Text>
      <Text className="mb-4">
        We have sent a code to confirm your password reset
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="w-full my-3">
          <PasswordInput
            name="newPassword"
            control={control}
            placeholder="New Password"
            label="New Password"
          />
        </View>
        <View className="w-full mb-3">
          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            control={control}
            name="confirmPassword"
          />
        </View>
        <View className="w-full mb-3">
          <Input
            inputMode="numeric"
            control={control}
            name="code"
            placeholder="Confirmation code"
            label="Confirmation Code"
            maxLength={4}
          />
        </View>
      </KeyboardAvoidingView>

      <CustomButton
        label="Reset Password"
        className="w-full bg-primary p-2.5 cursor-pointer my-2"
        onPress={handleSubmit(changePassword)}
        loading={resetPasswordMutation.isPending}
        disabled={!isValid}
      />
      <View className="mt-3 items-center">
        <TouchableOpacity onPress={() => changeStep(0)}>
          <Text className="text-sm text-primary font-medium">
            {'< Go back'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
