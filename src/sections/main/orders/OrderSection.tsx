import {useQuery} from '@tanstack/react-query';
import {Skeleton} from 'moti/skeleton';
import React, {useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {Modal} from 'react-native-magnus';

import OrderSummary from './OrderSummary';
import BottomSheet from '../../../components/BottomSheet';
import OrderContentCard from '../../../components/shared/cards/OrderContentCard';
import ErrorMessage from '../../../components/shared/errors/ErrorMessage';
import OrdersSkeleton from '../../../components/shared/skeletons/OrdersSkeleton';
import {getUserBooking} from '../../../lib/booking';
import {Status} from '../../../types';
import {Booking} from '../../../types/booking';

interface Props {
  status: Status;
}
export default function OrderSection({status}: Props) {
  const {data, isLoading} = useQuery({
    queryKey: [status, 'my-orders'],
    queryFn: () => getUserBooking(status),
  });

  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null);

  if (isLoading) return <OrdersSkeleton />;

  if (data?.length === 0 && !isLoading) {
    return (
      <View className="bg-white h-[55%] w-full">
        <ErrorMessage
          title="No orders"
          description={`You don't any ${status} orders`}
        />
      </View>
    );
  }

  return (
    <View className="mt-4 min-h-full">
      <FlatList
        data={data}
        keyExtractor={booking => booking.id}
        renderItem={({item}) => (
          <OrderContentCard
            booking={item}
            onPress={data => setSelectedOrder(data)}
          />
        )}
      />
      <Modal
        h="85%"
        isVisible={selectedOrder !== null}
        onDismiss={() => setSelectedOrder(null)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <OrderSummary
            booking={selectedOrder!}
            onClose={() => setSelectedOrder(null)}
          />
        </ScrollView>
      </Modal>
    </View>
  );
}
