import {useMutation} from '@tanstack/react-query';
import {useLocalSearchParams, useRouter} from 'expo-router';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, SafeAreaView, Text, View} from 'react-native';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Container from '../../../components/shared/Container';
import OTPInput from '../../../components/shared/inputs/OTPInput';
import {LOCATION_KEY} from '../../../constants';
import {verifyAccount} from '../../../lib/auth';
import {getErrorMessage, getFromSecureStore} from '../../../utils/helpers';
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
      async onSuccess() {
        const location = await getFromSecureStore(LOCATION_KEY);
        if (location) {
          router.replace('/(main)/Home/home');
          return;
        }
        router.replace('/(main)/location');
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
