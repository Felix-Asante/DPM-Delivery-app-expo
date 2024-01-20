import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/shared/Tabs';
import ErrorMessage from '../../../components/shared/errors/ErrorMessage';
import {BookingStatus} from '../../../constants/enums';
import OrderSection from '../../../sections/main/orders/OrderSection';
import {useAuthStore} from '../../../store/useAuth';

export default function Orders() {
  const {user} = useAuthStore();

  if (!user) {
    return (
      <View className="bg-white h-full">
        <ErrorMessage
          title="No orders"
          description="Login to see you past orders"
        />
      </View>
    );
  }

  return (
    <View className="bg-white h-full">
      <SafeAreaView>
        <View className="pt-5 px-4">
          <Text className="font-bold text-xl text-black mb-5">Orders</Text>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger id="pending" title="Pending" />
              <TabsTrigger id="completed" title="Completed" />
              <TabsTrigger id="cancelled" title="Cancelled" />
            </TabsList>
            <TabsContent value="pending">
              <OrderSection status={BookingStatus.PENDING} />
            </TabsContent>
            <TabsContent value="completed">
              <OrderSection status={BookingStatus.CONFIRMED} />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderSection status={BookingStatus.CANCELLED} />
            </TabsContent>
          </Tabs>
        </View>
      </SafeAreaView>
    </View>
  );
}
