import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'expo-router';
import React from 'react';
import {View, Text} from 'react-native';

import GoBack from '../../../../components/GoBack';
import CustomButton from '../../../../components/shared/Buttons/CustomButton';
import PasswordInput from '../../../../components/shared/inputs/PasswordInput';
import {useReactHookForm} from '../../../../hooks/useReactHookForm';
import {changePassword} from '../../../../lib/auth';
import {useAuthStore} from '../../../../store/useAuth';
import {getErrorMessage} from '../../../../utils/helpers';
import {toastErrorMessage} from '../../../../utils/toast';
import {
  UpdatePasswordDto,
  updatePasswordSchema,
} from '../../../../validations/auth';

export default function ChangePassword() {
  const {control, handleSubmit} = useReactHookForm<UpdatePasswordDto>({
    schema: updatePasswordSchema,
  });

  const {mutateAsync, isPending} = useMutation({mutationFn: changePassword});
  const logout = useAuthStore(state => state.logout);
  const router = useRouter();

  const changePasswordHandler = async (payload: UpdatePasswordDto) => {
    try {
      await mutateAsync(payload, {
        onSuccess() {
          logout();
          router.replace('/(main)/Home/home');
        },
        onError(error) {
          toastErrorMessage(getErrorMessage(error));
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View className="pt-16 px-3">
      <GoBack label="Modify password" />

      <View className="my-3">
        <PasswordInput
          control={control}
          placeholder="Current Password"
          label="Current Password"
          name="password"
        />

        <View className="my-3">
          <PasswordInput
            control={control}
            placeholder="New Password"
            label="New Password"
            name="newPassword"
          />
        </View>

        <PasswordInput
          control={control}
          placeholder="Confirm Password"
          label="Confirm Password"
          name="confirmPassword"
        />

        <View className="mt-3">
          <CustomButton
            label="Change Password"
            className="w-full bg-primary p-2.5 cursor-pointer mt-8"
            onPress={handleSubmit(changePasswordHandler)}
            loading={isPending}
          />
        </View>
      </View>
    </View>
  );
}
