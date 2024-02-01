import {Link, useRouter} from 'expo-router';
import {LocateFixed, ShoppingBag} from 'lucide-react-native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../../constants/Colors';
import {useGlobalStore} from '../../../store/global';
import {useCart} from '../../../store/useCart';
import {shorten} from '../../../utils/helpers';

export default function AppHeader() {
  const cart = useCart(state => state.cart);
  const {userLocation} = useGlobalStore();
  const router = useRouter();

  return (
    <View className="mb-1 px-3">
      <View className="flex flex-row items-center justify-between mb-4">
        <View>
          <Text className="font-medium mb-1 text-gray">Deliver to</Text>
          <TouchableOpacity
            onPress={() => router.push('/(main)/location')}
            className="flex flex-row items-center justify-between gap-2">
            <Text className="font-bold  text-dark ">
              {shorten(userLocation?.main_text ?? '')}
            </Text>
            <LocateFixed size={18} color={Colors.primary.main} />
          </TouchableOpacity>
        </View>
        <Link href="/(main)/cart" className=" flex items-center justify-center">
          <View className="relative">
            <ShoppingBag color={Colors.dark.main} size={23} />
            {cart.length > 0 && (
              <View className="absolute -top-[3px] right-0 bg-primary w-[6px] h-[6px] rounded-full" />
            )}
          </View>
        </Link>
      </View>
    </View>
  );
}
