import {useMutation} from '@tanstack/react-query';
import {Phone} from 'lucide-react-native';
import React from 'react';
import {View, Text} from 'react-native';
import {z} from 'zod';

import CustomButton from '../../components/shared/Buttons/CustomButton';
import Input from '../../components/shared/inputs';
import Colors from '../../constants/Colors';
import {useReactHookForm} from '../../hooks/useReactHookForm';
import {getResetPasswordCode} from '../../lib/auth';
import {getErrorMessage} from '../../utils/helpers';
import {toastErrorMessage} from '../../utils/toast';
import {IPhone, phoneValidation} from '../../validations';

interface Props {
  changeStep: (index: number) => void;
}
export default function ForgotPasswordStepOne({changeStep}: Props) {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useReactHookForm<IPhone>({
    schema: phoneValidation,
  });

  const requestCodeMutation = useMutation({mutationFn: getResetPasswordCode});

  const requestResetCode = (data: IPhone) => {
    requestCodeMutation.mutate(data, {
      onSuccess() {
        changeStep(1);
      },
      onError(error) {
        toastErrorMessage(getErrorMessage(error));
      },
    });
  };
  return (
    <View>
      <Text className="text-primary capitalize text-xl mb-4 font-bold">
        Forgot Password ?
      </Text>
      <Text className="mb-8">
        Enter phone number and we will send you a code to reset your password
      </Text>
      <Input
        startContent={<Phone color={Colors.light.main} size={20} />}
        keyboardType="phone-pad"
        placeholder="024 **** ***"
        control={control}
        name="phone"
        className="mb-8"
      />
      <CustomButton
        onPress={handleSubmit(requestResetCode)}
        label="Continue"
        loading={requestCodeMutation.isPending}
        disabled={!isValid}
      />
    </View>
  );
}
