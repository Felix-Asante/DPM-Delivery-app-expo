import {useMutation} from '@tanstack/react-query';
import {useLocalSearchParams, useRouter} from 'expo-router';
import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, SafeAreaView, Image} from 'react-native';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Container from '../../../components/shared/Container';
import OTPInput from '../../../components/shared/inputs/OTPInput';
import {verifyAccount} from '../../../lib/auth';
import {getErrorMessage} from '../../../utils/helpers';
import {toastErrorMessage} from '../../../utils/toast';

export default function OtpScreen() {
  const {control, handleSubmit, watch} = useForm<{otp: string}>();

  const verifyOtpMutation = useMutation({
    mutationFn: verifyAccount,
  });

  const router = useRouter();

  const params = useLocalSearchParams();

  const verifyOtp = (data: {otp: string}) => {
    verifyOtpMutation.mutate(data.otp, {
      onSuccess() {
        router.replace('/(app)/(home)/home/');
      },
      onError(error) {
        toastErrorMessage(getErrorMessage(error));
      },
    });
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <Container>
        <View className="h-full flex flex-col justify-center items-center bg-white w-[88%] mx-auto">
          <Image
            source={require('../../../../assets/images/app-logo.jpeg')}
            className="w-48 h-32"
          />
          <Text className="text-dark  text-xl mb-2 font-bold">
            OTP verification code
          </Text>
          <Text className="text-light">has been sent to {params?.phone}</Text>
          <View className="w-full mb-3">
            <OTPInput control={control} name="otp" />
          </View>
          <CustomButton
            label="Verify"
            onPress={handleSubmit(verifyOtp)}
            loading={verifyOtpMutation.isPending}
            disabled={watch('otp')?.length < 4}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
}
