import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Modal} from 'react-native-magnus';

import {BookingStatus} from '../../../constants/enums';
import AddReviewForm from '../../../sections/main/orders/AddReviewForm';
import {Booking} from '../../../types/booking';

interface Props {
  booking: Booking;
  onPress: (data: Booking) => void;
}
export default function OrderContentCard({booking, onPress}: Props) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  return (
    <View>
      <View className="bg-light-100 rounded-xl p-2 mb-3">
        <Pressable
          onPress={() => onPress(booking)}
          className="flex flex-row items-start h-16 mb-3">
          <Image
            source={{uri: booking?.place?.mainImage}}
            className="rounded-lg w-[70px] h-[90%] object-cover"
          />
          <View className="ml-3 flex-1">
            <View className="flex flex-row justify-between items-start">
              <Text className="font-medium text-dark capitalize">
                {booking?.place?.name}
              </Text>

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
        </Pressable>
        {booking?.status?.label === BookingStatus.PENDING ? (
          <ActiveActionButton />
        ) : booking?.status?.label === BookingStatus.CONFIRMED ? (
          <CompletedActionButton addReview={() => setShowReviewModal(true)} />
        ) : (
          <CancelledActionButton />
        )}
      </View>
      <Modal isVisible={showReviewModal} h="50%">
        <AddReviewForm
          bookingId={booking?.id}
          onClose={() => setShowReviewModal(false)}
        />
      </Modal>
    </View>
  );
}

function ActiveActionButton() {
  return (
    <View className="flex-row justify-start gap-x-5 pt-3 pb-2 border-t border-light-200">
      {/* <TouchableOpacity className="border-2 border-primary rounded-md py-1 px-2 min-w-[120px]">
        <Text className="text-primary text-center font-medium">
          Cancel Order
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity className="py-1.5 px-2 bg-primary  rounded-md min-w-[120px]">
        <Text className="text-white font-medium text-center">Track Order</Text>
      </TouchableOpacity>
    </View>
  );
}

interface CompleteButtonsProps {
  addReview: () => void;
}
function CompletedActionButton({addReview}: CompleteButtonsProps) {
  const router = useRouter();

  return (
    <View className="flex-row justify-start gap-x-5 pt-3 pb-2 border-t border-light-200">
      <TouchableOpacity
        onPress={addReview}
        className="border-2 border-primary rounded-md py-1 px-2 min-w-[120px]">
        <Text className="text-primary text-center font-medium">
          Leave a Review
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity className="py-1.5 px-2 bg-primary  rounded-md min-w-[120px]">
        <Text className="text-white font-medium text-center">Order Again</Text>
      </TouchableOpacity> */}
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
