import React from 'react';
import {View, Text, Pressable, TouchableOpacity, Image} from 'react-native';

import {BookingStatus} from '../../../constants/enums';
import {Booking} from '../../../types/booking';

interface Props {
  booking: Booking;
}
export default function OrderContentCard({booking}: Props) {
  return (
    <View>
      <Pressable className="bg-light-100 rounded-xl p-2 mb-3">
        <View className="flex flex-row items-start h-16 mb-3">
          <Image
            source={{uri: booking?.place?.[0]?.mainImage}}
            className="rounded-lg w-[70px] h-[90%] object-cover"
          />
          <View className="ml-3 flex-1">
            <View className="flex flex-row justify-between items-start">
              {booking?.place?.length <= 1 ? (
                <Text className="font-medium text-dark capitalize">
                  {booking?.place?.[0]?.name}
                </Text>
              ) : (
                <Text />
              )}
              <Text className="font-bold text-primary">
                GH₵ {booking?.total_amount}{' '}
              </Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Text className="text-light text-[12px]">
                {new Date(booking?.createdAt).toDateString()}
              </Text>
              <View className="w-1 h-1 rounded-full bg-light mx-2" />
              {booking?.services?.length > 0 && (
                <Text className="text-light text-[12px]">
                  {booking?.services?.length} services
                </Text>
              )}
            </View>
            <View className="flex-row items-center mt-1">
              <Text className="text-light">Reference Number:</Text>
              <Text className="text-dark ml-1 font-medium">
                {booking?.reference_code}
              </Text>
            </View>
          </View>
        </View>
        {booking?.status?.label === BookingStatus.PENDING ? (
          <ActiveActionButton />
        ) : booking?.status?.label === BookingStatus.CONFIRMED ? (
          <CompletedActionButton />
        ) : (
          <CancelledActionButton />
        )}
      </Pressable>
    </View>
  );
}

function ActiveActionButton() {
  return (
    <View className="flex-row justify-center gap-x-5 pt-3 pb-2 border-t border-light-200">
      <TouchableOpacity className="border-2 border-primary rounded-md py-1 px-2 min-w-[120px]">
        <Text className="text-primary text-center font-medium">
          Cancel Order
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="py-1.5 px-2 bg-primary  rounded-md min-w-[120px]">
        <Text className="text-white font-medium text-center">Track Order</Text>
      </TouchableOpacity>
    </View>
  );
}
function CompletedActionButton() {
  return (
    <View className="flex-row justify-center gap-x-5 pt-3 pb-2 border-t border-light-200">
      <TouchableOpacity className="border-2 border-primary rounded-md py-1 px-2 min-w-[120px]">
        <Text className="text-primary text-center font-medium">
          Leave a Review
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="py-1.5 px-2 bg-primary  rounded-md min-w-[120px]">
        <Text className="text-white font-medium text-center">Order Again</Text>
      </TouchableOpacity>
    </View>
  );
}
function CancelledActionButton() {
  return (
    <View className="flex-row gap-x-5 pt-3 pb-2 border-t border-light-200">
      <TouchableOpacity className="py-1.5 px-2 bg-primary  rounded-md min-w-[120px]">
        <Text className="text-white font-medium text-center">Order Again</Text>
      </TouchableOpacity>
    </View>
  );
}
