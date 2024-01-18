import {Link} from 'expo-router';
import {LocateFixed, ShoppingBag} from 'lucide-react-native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../../constants/Colors';
import {useCart} from '../../../store/useCart';

interface Props {
  openCart: () => void;
  goToChooseLocation: () => void;
}
export default function AppHeader() {
  const cart = useCart(state => state.cart);

  return (
    <View className="mb-1 px-3">
      <View className="flex flex-row items-center justify-between mb-4">
        <View>
          <Text className="font-medium mb-1 text-gray">Deliver to</Text>
          <TouchableOpacity
            // onPress={goToChooseLocation}
            className="flex flex-row items-center justify-between gap-2">
            <Text className="font-bold  text-dark ">Aflao border</Text>
            <LocateFixed size={18} color={Colors.primary.main} />
          </TouchableOpacity>
        </View>
        <Link
          href="/(main)/cart"
          className=" flex items-center justify-center border border-light-200">
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
