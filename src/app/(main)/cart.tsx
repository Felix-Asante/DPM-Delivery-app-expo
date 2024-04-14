import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'expo-router';
import {ChevronLeftIcon, ChevronRight, Milestone} from 'lucide-react-native';
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Host, Overlay, Portal} from 'react-native-magnus';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomButton from '../../components/shared/Buttons/CustomButton';
import ErrorMessage from '../../components/shared/errors/ErrorMessage';
import Input from '../../components/shared/inputs';
import Colors from '../../constants/Colors';
import {useReactHookForm} from '../../hooks/useReactHookForm';
import {createBooking} from '../../lib/booking';
import {makePayment} from '../../lib/transactions';
import SummaryItem from '../../sections/main/SummaryItem';
import CartItem from '../../sections/main/cart/CartItem';
import {useGlobalStore} from '../../store/global';
import {usePreferences} from '../../store/settings';
import {useAuthStore} from '../../store/useAuth';
import {useCart} from '../../store/useCart';
import {BookingDto} from '../../types/booking';
import {MakePaymentDto} from '../../types/dto/transactions';
import {generateRandomString, getErrorMessage} from '../../utils/helpers';
import {toastErrorMessage} from '../../utils/toast';
import {BookingExtraFields, cartValidation} from '../../validations/booking';

type BookingStatus = 'failed' | 'completed' | null;

export default function CartScreen() {
  const {cart, totalCost, deliveryCost, clearCart} = useCart(state => state);
  const {user} = useAuthStore();

  const {control, handleSubmit, watch} = useReactHookForm<BookingExtraFields>({
    schema: cartValidation,
  });

  const riderTip = watch('tip') ? Number(watch('tip')) : 0;
  const total = totalCost + deliveryCost + riderTip;

  const [formData, setFormData] = useState<BookingExtraFields>({
    tip: 0,
  });

  const router = useRouter();
  const {userLocation} = useGlobalStore();

  const {paymentMethod} = usePreferences();

  const bookingMutation = useMutation({
    mutationFn: (data: BookingDto) => createBooking(data),
  });
  const paymentMutation = useMutation({
    mutationFn: (data: MakePaymentDto) => makePayment(data),
  });

  const organizeCartItems = (transactionId: string, requestId: string) => {
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
      delivery_address: userLocation?.main_text!,
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
      request_id: requestId,
    };
  };

  const completePayment = async () => {
    const time = new Date().getTime();
    const transactionId = `trans-${generateRandomString(5)}-${time}`;
    const requestId = `req-${generateRandomString(5)}-${time}`;
    const reference = generateRandomString(8);

    if (!user) {
      router.push({
        pathname: '/(auth)/auth/login',
        params: {canGoBack: 'true'},
      });
      return;
    }
    const data = organizeCartItems(transactionId, requestId);

    if (!paymentMethod) {
      toastErrorMessage('Add a payment method');
      return;
    }

    const paymentPayload = {
      amount: total,
      currency: 'GHS',
      customerName: paymentMethod?.customerName!,
      provider: paymentMethod?.value,
      reference,
      customerMobile: paymentMethod?.customerNumber!,
      transactionId,
      requestId,
    };

    const mutationOptions = {
      onSuccess() {
        // setBookingStatus('completed');
        router.push({
          pathname: '/(main)/bookingCompleted',
          params: {bookingStatus: 'completed'},
        });
        clearCart();
      },
      onError(error: any) {
        // console.log(data);
        console.log('Booking error===', getErrorMessage(error));
        // request refund
        // setBookingStatus('failed');
        router.push({
          pathname: '/(main)/bookingCompleted',
          params: {bookingStatus: 'failed'},
        });
      },
    };

    paymentMutation.mutate(paymentPayload, {
      onError(error: any) {
        console.log('Payment error===', getErrorMessage(error));
        toastErrorMessage(getErrorMessage(error));
      },
      onSuccess() {
        bookingMutation.mutate(data, mutationOptions);
      },
    });
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="h-full px-3 pb-5 bg-white">
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
                <Text className="text-base text-black mb-2.5 font-bold">
                  Your Order
                </Text>
                <CartItem />
              </View>
              <View className="mt-3">
                <Text className="text-base text-black mb-2 font-bold">
                  Delivery details
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(main)/location')}
                  className="flex-row mb-6 bg-light-200 border border-light-200 p-3 rounded-md items-center justify-between">
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
                <View>
                  <Text className="text-base text-black mb-2 font-bold">
                    Payment method
                  </Text>
                </View>
                {/* <Input
                label="Email"
                placeholder="email@example.com"
                className="mb-3"
                name="email"
                control={control}
              /> */}
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
              {!user ? (
                <CustomButton
                  label="Login to complete order"
                  onPress={() =>
                    router.push({
                      pathname: '/(auth)/auth/login',
                      params: {canGoBack: 'true'},
                    })
                  }
                />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => router.push('/(main)/profile/')}
                    className="px-2 py-3 mb-3 border border-light-200 rounded-md">
                    {paymentMethod ? (
                      <View className="flex-row justify-between items-center">
                        <View>
                          <Text className="font-medium text-sm">
                            {paymentMethod.label}
                          </Text>
                          <Text className="font-medium text-sm text-primary">
                            Change
                          </Text>
                        </View>
                        <Text className="text-black font-regular text-sm">
                          GH₵ {total.toFixed(2)}{' '}
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-primary">
                        Choose a payment method
                      </Text>
                    )}
                  </TouchableOpacity>
                  <CustomButton
                    label="Place order"
                    onPress={handleSubmit(completePayment)}
                    // disabled={!isValid}
                    loading={
                      bookingMutation.isPending || paymentMutation.isPending
                    }
                  />
                </>
              )}
            </View>
          ) : (
            <ErrorMessage
              title="Empty cart"
              description="Your don't have any items in your cart"
            />
          )}
        </ScrollView>
        {(bookingMutation.isPending || paymentMutation.isPending) && (
          <Host>
            <Portal>
              <View className="bg-black/10 w-full h-full items-center justify-center">
                <ActivityIndicator size="large" color={Colors.primary.main} />
              </View>
            </Portal>
          </Host>
        )}
      </View>
    </SafeAreaView>
  );
}
