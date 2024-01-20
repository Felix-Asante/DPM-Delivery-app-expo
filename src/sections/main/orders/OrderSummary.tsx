import {
  BadgeCheck,
  Loader,
  LocateFixed,
  Milestone,
  X,
  XCircle,
} from 'lucide-react-native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import {BookingStatus} from '../../../constants/enums';
import {Booking} from '../../../types/booking';
import SummaryItem from '../SummaryItem';

interface Props {
  onClose: () => void;
  booking: Booking;
}

function getBookingStatusIcon(status: string) {
  switch (status) {
    case BookingStatus.CANCELLED:
    case BookingStatus.REJECTED:
      return <XCircle color={Colors.primary.main} size={50} />;
    case BookingStatus.CONFIRMED:
    case BookingStatus.DELIVERED:
      return <BadgeCheck color={Colors.primary.main} size={50} />;
    case BookingStatus.PENDING:
      return <Loader color={Colors.primary.main} size={50} />;
  }
}
export default function OrderSummary({onClose, booking}: Props) {
  const productCost = booking?.total_amount - booking?.delivery_fee;
  return (
    <View className="flex-1 h-full py-2">
      <TouchableOpacity className="items-end pr-3" onPress={onClose}>
        <View className="bg-primary-100 items-center justify-center h-7 w-7 rounded-full border border-primary">
          <X size={20} color={Colors.dark.main} />
        </View>
      </TouchableOpacity>
      <View className="flex-row items-start px-3 border-b border-light-200 pb-3">
        {getBookingStatusIcon(booking?.status?.label)}
        <View className="ml-4">
          <Text className="text-lg text-primary capitalize">
            {booking?.status?.label}
          </Text>
          <Text className="text-dark text-sm">
            {new Date(booking?.createdAt).toDateString()}
          </Text>
          <Text className="text-light text-sm">
            Reference: {booking?.reference_code}
          </Text>
        </View>
      </View>
      <View className="mb-5 mt-3 px-3">
        <Text className="text-lg text-dark capitalize mb-3">Order details</Text>
        <View>
          {booking?.services?.length === 0 &&
            booking?.place.map(place => (
              <View key={place?.id} className="mb-2">
                <View className="flex-row justify-between">
                  <View className="flex-row w-[80%]">
                    <Text className="text-dark mr-3">1x</Text>
                    <View>
                      <Text className="text-dark mb-1">{place?.name}</Text>
                    </View>
                  </View>
                  <Text className="font-bold  text-dark ml-3">
                    GH₵ {place?.averagePrice}{' '}
                  </Text>
                </View>
              </View>
            ))}
          {booking?.services?.length > 0 &&
            booking?.services?.map(service => (
              <View key={service?.id} className="mb-2">
                <View className="flex-row justify-between">
                  <View className="flex-row w-[80%]">
                    <Text className="text-dark font-bold mr-3">
                      {service?.quantity}x
                    </Text>
                    <View>
                      <Text className="text-dark mb-1">
                        {service?.product?.name}
                      </Text>
                      <Text className="text-light  leading-normal">
                        {service?.product?.description}
                      </Text>
                    </View>
                  </View>
                  <Text className="font-bold  text-dark ml-3">
                    GH₵ {service?.quantity * service?.product?.price}{' '}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>
      <View className=" px-3">
        <Text className="text-lg text-dark capitalize mb-3">Delivery</Text>

        <View className="flex-row">
          <Milestone size={28} color={Colors.primary.main} />
          <Text className="font-medium ml-4 text-dark">
            {booking?.place?.length > 0
              ? booking?.place?.[0]?.address
              : 'DPM Delivery Office'}
          </Text>
        </View>
        <View className="ml-[13px]">
          <Text className="text-primary text-[8px] font-medium">|</Text>
          <Text className="text-primary text-[8px] font-medium">|</Text>
        </View>
        <View className="flex-row mb-4">
          <LocateFixed size={28} color={Colors.primary.main} />
          <Text className="font-medium ml-4 text-dark">
            {booking?.recipient_address}
          </Text>
        </View>
      </View>
      <View className="bg-light-100 p-3">
        <Text className="text-lg text-dark  capitalize mb-3">Summary</Text>

        <SummaryItem label="Products cost" value={productCost?.toString()} />
        <SummaryItem
          label="Delivery cost"
          value={booking?.delivery_fee?.toString()}
        />
        <SummaryItem
          label="Courir tips"
          value={booking?.rider_tip?.toString()}
        />

        <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-t-light-200">
          <Text className="text-dark font-bold text-[17px]">Total</Text>
          <Text className="text-primary font-bold text-[17px]">
            GH₵ {booking?.total_amount}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
}
