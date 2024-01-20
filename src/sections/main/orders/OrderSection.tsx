import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, Text, View} from 'react-native';

import OrderContentCard from '../../../components/shared/cards/OrderContentCard';
import ErrorMessage from '../../../components/shared/errors/ErrorMessage';
import OrdersSkeleton from '../../../components/shared/skeletons/OrdersSkeleton';
import {getUserBooking} from '../../../lib/booking';
import {Status} from '../../../types';

interface Props {
  status: Status;
}
export default function OrderSection({status}: Props) {
  const {data, isLoading} = useQuery({
    queryKey: [status, 'my-orders'],
    queryFn: () => getUserBooking(status),
  });

  if (isLoading)
    return (
      <View className="pr-4">
        {[1, 2, 3, 4].map(i => (
          <OrdersSkeleton key={i} />
        ))}
      </View>
    );

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
    <View className="mt-4">
      <FlatList
        data={data}
        keyExtractor={booking => booking.id}
        renderItem={({item}) => <OrderContentCard booking={item} />}
      />
    </View>
  );
}
