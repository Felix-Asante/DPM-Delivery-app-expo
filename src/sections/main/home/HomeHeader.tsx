import PlacesAutocomplete from 'expo-google-places-autocomplete';
import {Link, useRouter} from 'expo-router';
import {LocateFixed, ShoppingBag} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../../constants/Colors';
import {useCart} from '../../../store/useCart';
import {toastErrorMessage} from '../../../utils/toast';

export default function AppHeader() {
  const cart = useCart(state => state.cart);
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_GOOGLE_API_KEY) {
      PlacesAutocomplete.initPlaces(process.env.EXPO_PUBLIC_GOOGLE_API_KEY);
    } else {
      toastErrorMessage(
        'You cannot use this feature at the moment, try again later',
      );
    }
  }, []);

  const findPlaces = React.useCallback(async (location: string) => {
    try {
      const result = await PlacesAutocomplete.findPlaces(location, {
        countries: ['GH'],
      });
      setResults(result.places);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View className="mb-1 px-3">
      <View className="flex flex-row items-center justify-between mb-4">
        <View>
          <Text className="font-medium mb-1 text-gray">Deliver to</Text>
          <TouchableOpacity
            onPress={() => router.push('/(main)/location')}
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
