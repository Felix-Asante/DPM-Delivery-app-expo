import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'expo-router';
import {ChevronLeftIcon, ChevronRight, Milestone} from 'lucide-react-native';
import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import CustomButton from '../../components/shared/Buttons/CustomButton';
import ErrorMessage from '../../components/shared/errors/ErrorMessage';
import Input from '../../components/shared/inputs';
import Colors from '../../constants/Colors';
import {useReactHookForm} from '../../hooks/useReactHookForm';
import {createBooking} from '../../lib/booking';
import SummaryItem from '../../sections/main/SummaryItem';
import CartItem from '../../sections/main/cart/CartItem';
import {useAuthStore} from '../../store/useAuth';
import {useCart} from '../../store/useCart';
import {BookingDto} from '../../types/booking';
import {BookingExtraFields, cartValidation} from '../../validations/booking';

export default function CartScreen() {
  const {cart, totalCost, deliveryCost, clearCart} = useCart(state => state);
  const {user} = useAuthStore();
  const [bookingStatus, setBookingStatus] = useState({
    failed: false,
    completed: false,
  });

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useReactHookForm<BookingExtraFields>({schema: cartValidation});

  const total = totalCost + deliveryCost;

  const [formData, setFormData] = useState<BookingExtraFields>({
    email: '',
    tip: 0,
  });

  const router = useRouter();

  const bookingMutation = useMutation({
    mutationFn: (data: BookingDto) => createBooking(data),
  });

  const paymentHandler = (data: BookingExtraFields) => {
    setFormData(data);
  };

  const organizeCartItems = (transactionId: string) => {
    const places = cart.map(booking => booking.place);
    const products = cart.map(booking => ({
      product: booking?.id,
      price: booking.price,
      quantity: booking.quantity,
      place: booking.place,
    }));

    return {
      delivery_address: 'fes', //fix address
      recipient_phone: user?.phone!,
      rider_tip: formData.tip ?? 0,
      transaction_id: transactionId,
      services: products,
      amount: 0, // fix if user is booking place directly
      place: places,
      total_amount: total,
      quantity: 0, // fix if user is booking place directly
      price: 0, // fix if user is booking place directly
      delivery_fee: deliveryCost,
    };
  };

  const completePayment = async (transactionId: string) => {
    const mutationOptions = {
      onSuccess() {
        setBookingStatus(status => ({...status, completed: true}));
        clearCart();
      },
      onError(error: any) {
        console.log(JSON.stringify(error));
        // request refund
        setBookingStatus(status => ({...status, failed: true}));
      },
    };
    const data = organizeCartItems(transactionId);

    bookingMutation.mutate(data, mutationOptions);
  };

  return (
    <View className="h-full px-3 pt-14">
      <ScrollView className="h-full">
        <View className="flex flex-row items-center gap-2 mb-5">
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftIcon size={30} className=" text-primary" />
          </TouchableOpacity>
          <Text className="font-semibold text-lg text-black ml-3">
            Checkout Orders
          </Text>
        </View>
        {cart.length > 0 ? (
          <View>
            <View>
              <Text className="text-lg text-black mb-2.5 font-bold">
                Your Order
              </Text>
              {cart.map(p => (
                <CartItem key={p.id} product={p} />
              ))}
            </View>
            <View className="mt-3">
              <Text className="text-lg text-black mb-2 font-bold">
                Delivery details
              </Text>
              <Pressable className="flex-row mb-8 bg-light-200 border border-light-200 p-3 rounded-md items-center justify-between">
                <View className="flex-row">
                  <Milestone size={28} color={Colors.primary.main} />
                  <View className="ml-3">
                    <Text className="text-black">
                      Deliver to current address:
                    </Text>
                    <Text className="font-medium  text-dark">
                      Donkorkrom retail shop22, bank avenue
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={Colors.dark.main} />
              </Pressable>
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
              <SummaryItem label="Courier tip" value="0" />
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
              onPress={handleSubmit(paymentHandler)}
              disabled={!isValid}
            />
          </View>
        ) : (
          <ErrorMessage
            title="Empty cart"
            description="Your don't have any items in your cart"
          />
        )}
      </ScrollView>
    </View>
  );
}
