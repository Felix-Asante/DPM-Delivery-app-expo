import {useLocalSearchParams, useRouter} from 'expo-router';
import React from 'react';
import {View, Text, Image} from 'react-native';

import CustomButton from '../../components/shared/Buttons/CustomButton';

const celebrateSvg = '../../../assets/images/celebrate.png';
const cancelledSvg = '../../../assets/images/cancel.png';

export default function BookingCompeleted() {
  const {bookingStatus = 'completed'} = useLocalSearchParams<{
    bookingStatus: string;
  }>();

  const router = useRouter();

  const bookingStatusModal: any = {
    failed: {
      message: 'An error occurred while booking',
      image: cancelledSvg,
      actions: (
        <CustomButton
          label="Retry"
          onPress={() => router.push('/(main)/cart')}
        />
      ),
    },
    completed: {
      message: 'Reservation successfully made',
      image: celebrateSvg,
      actions: (
        <CustomButton
          label="View booking"
          onPress={() => router.push('/(main)/Home/orders')}
        />
      ),
    },
  };

  return (
    <View className="bg-white h-full rounded-md p-3 justify-center items-center">
      {bookingStatus === 'completed' ? (
        <Image
          source={require('../../../assets/images/celebrate.png')}
          className="w-32 h-32 mb-2"
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require('../../../assets/images/cancel.png')}
          className="w-32 h-32 mb-2"
          resizeMode="contain"
        />
      )}
      <Text className="mb-6 mt-2 font-bold">
        {bookingStatusModal[bookingStatus].message}
      </Text>
      <View className="px-5 w-full">
        {bookingStatusModal[bookingStatus].actions}
      </View>
    </View>
  );
}
