import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'expo-router';
import {ChevronLeftIcon, ChevronRight, Milestone} from 'lucide-react-native';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Host, Overlay, Portal} from 'react-native-magnus';

import CustomButton from '../../components/shared/Buttons/CustomButton';
import ErrorMessage from '../../components/shared/errors/ErrorMessage';
import Input from '../../components/shared/inputs';
import Colors from '../../constants/Colors';
import {useReactHookForm} from '../../hooks/useReactHookForm';
import {createBooking} from '../../lib/booking';
import SummaryItem from '../../sections/main/SummaryItem';
import CartItem from '../../sections/main/cart/CartItem';
import {useGlobalStore} from '../../store/global';
import {useAuthStore} from '../../store/useAuth';
import {useCart} from '../../store/useCart';
import {BookingDto} from '../../types/booking';
import {getErrorMessage} from '../../utils/helpers';
import {BookingExtraFields, cartValidation} from '../../validations/booking';

const celebrateSvg = '../../../assets/images/celebrate.png';
const cancelledSvg = '../../../assets/images/cancel.png';

type BookingStatus = 'failed' | 'completed' | null;
export default function CartScreen() {
  const {cart, totalCost, deliveryCost, clearCart} = useCart(state => state);
  const {user} = useAuthStore();
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(null);

  const {control, handleSubmit, watch} = useReactHookForm<BookingExtraFields>({
    schema: cartValidation,
  });

  const riderTip = watch('tip') ? Number(watch('tip')) : 0;
  const total = totalCost + deliveryCost + riderTip;

  const [formData, setFormData] = useState<BookingExtraFields>({
    email: '',
    tip: 0,
  });

  const router = useRouter();
  const {userLocation} = useGlobalStore();

  const bookingMutation = useMutation({
    mutationFn: (data: BookingDto) => createBooking(data),
  });

  const organizeCartItems = (transactionId: string) => {
    const places = cart?.place?.id!;
    // const products = {
    //   product: cart?.id!,
    //   price: cart?.price!,
    //   quantity: cart?.quantity!,
    //   place: cart?.place!,
    // };
    const products = cart?.services.map(({quantity, price, id}) => ({
      quantity,
      price,
      place: places,
      product: id,
    }));

    return {
      delivery_address: userLocation?.main_text!, //fix address
      recipient_phone: user?.phone!,
      rider_tip: formData.tip ?? 0,
      transaction_id: transactionId,
      services: products ?? [],
      amount: 0, // fix if user is booking place directly
      place: places,
      total_amount: total,
      quantity: 0, // fix if user is booking place directly
      price: 0, // fix if user is booking place directly
      delivery_fee: deliveryCost,
    };
  };

  const completePayment = async () => {
    const data = organizeCartItems('transactionId');
    const mutationOptions = {
      onSuccess() {
        setBookingStatus('completed');
        clearCart();
      },
      onError(error: any) {
        console.log(data);
        console.log(getErrorMessage(error));
        // request refund
        setBookingStatus('failed');
      },
    };

    bookingMutation.mutate(data, mutationOptions);
  };

  const bookingStatusModal = {
    failed: {
      message: 'An error occurred while booking',
      image: cancelledSvg,
      actions: (
        <CustomButton label="Retry" onPress={() => setBookingStatus(null)} />
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
    <View className="h-full px-3 pt-14  pb-5 bg-white">
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center gap-2 mb-5">
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftIcon size={30} className=" text-primary" />
          </TouchableOpacity>
          <Text className="font-semibold text-lg text-black ml-3">
            Checkout Orders
          </Text>
        </View>
        {cart !== null ? (
          <View>
            <View>
              <Text className="text-lg text-black mb-2.5 font-bold">
                Your Order
              </Text>
              <CartItem />
            </View>
            <View className="mt-3">
              <Text className="text-lg text-black mb-2 font-bold">
                Delivery details
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(main)/location')}
                className="flex-row mb-8 bg-light-200 border border-light-200 p-3 rounded-md items-center justify-between">
                <View className="flex-row">
                  <Milestone size={28} color={Colors.primary.main} />
                  <View className="ml-3">
                    <Text className="text-black">
                      Deliver to current address:
                    </Text>
                    <Text className="font-medium  text-dark">
                      {userLocation?.main_text}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={Colors.dark.main} />
              </TouchableOpacity>
              <Input
                label="Email"
                placeholder="email@example.com"
                className="mb-3"
                name="email"
                control={control}
              />
              {/* <Input
                label="Phone number:"
                placeholder="Phone number"
                inputMode="numeric"
                className="mb-3"
                name="phone"
                control={control}
              /> */}

              <Input
                label="Courier tip:"
                placeholder="GH₵ 0.5"
                inputMode="numeric"
                name="tip"
                control={control}
              />
            </View>

            <View className="bg-light-200 border border-light-200 p-2.5 rounded-md mt-2 mb-7">
              <SummaryItem label="Subtotal" value={totalCost.toString()} />
              <SummaryItem
                label="Delivery fee"
                value={deliveryCost.toString()}
              />
              <SummaryItem label="Courier tip" value={riderTip?.toString()} />
              <SummaryItem label="Service Fee" value="0" />
              <View className="flex-row items-center justify-between mt-2 border-t border-t-light-200">
                <Text className="text-dark font-bold text-[17px]">Total</Text>
                <Text className="text-primary font-bold text-[17px]">
                  GH₵ {total.toFixed(2)}{' '}
                </Text>
              </View>
            </View>
            <CustomButton
              label="Proceed to make payment"
              onPress={handleSubmit(completePayment)}
              // disabled={!isValid}
              loading={bookingMutation.isPending}
            />
          </View>
        ) : (
          <ErrorMessage
            title="Empty cart"
            description="Your don't have any items in your cart"
          />
        )}
      </ScrollView>
      {bookingStatus && (
        <Overlay visible={bookingStatus !== null}>
          <View className="bg-white rounded-md p-3 items-center">
            {bookingStatus === 'completed' ? (
              <Image
                source={require('../../../assets/images/celebrate.png')}
                className="w-24 h-24 mb-2"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../../../assets/images/cancel.png')}
                className="w-24 h-24 mb-2"
                resizeMode="contain"
              />
            )}
            <Text className="mb-5 font-bold">
              {bookingStatusModal[bookingStatus].message}
            </Text>
            {bookingStatusModal[bookingStatus].actions}
          </View>
        </Overlay>
      )}
    </View>
  );
}
