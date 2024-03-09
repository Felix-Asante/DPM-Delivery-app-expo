import {useLocalSearchParams, useRouter} from 'expo-router';
import {ChevronLeftIcon} from 'lucide-react-native';
import React from 'react';
import {View, Text, ImageBackground, Pressable, Linking} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {DAYS_OF_THE_WEEK} from '../../../constants';
import {Place} from '../../../types/place';

export default function PlaceInfo() {
  const {place} = useLocalSearchParams<{place: string}>();
  const placeDetails: Place = JSON.parse(place);

  const openingHours = placeDetails?.openingHours;

  const router = useRouter();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="h-full bg-[#f4f4f4]">
      <ImageBackground
        source={{uri: placeDetails?.mainImage}}
        className="h-[170px]">
        <SafeAreaView className="p-3">
          <Pressable
            onPress={() => router.back()}
            className="items-center justify-center w-8 h-8 rounded-full bg-primary-100">
            <ChevronLeftIcon size={25} className="text-black" />
          </Pressable>
        </SafeAreaView>
      </ImageBackground>
      <View className="rounded-md p-3 bg-white my-4">
        <Text className="text-lg font-bold mb-2">General Info</Text>
        <Text className="text-black">Address: {placeDetails?.address}</Text>
        <Text className="text-black my-1">
          Delivery Fee: ₵{placeDetails?.deliveryFee}
        </Text>
        {placeDetails?.website && (
          <Pressable
            onPress={() =>
              placeDetails?.website
                ? Linking.openURL(placeDetails?.website)
                : undefined
            }>
            <Text className="text-primary">Website</Text>
          </Pressable>
        )}
      </View>
      <View className="rounded-md p-3 bg-white mb-4">
        <Text className="text-lg font-bold mb-2">Open for delivery orders</Text>
        {openingHours ? (
          DAYS_OF_THE_WEEK.map(day => (
            <View
              className="flex-row items-start justify-between p-1"
              key={day?.en?.toUpperCase()}>
              <Text className="capitalize text-sm md:text-md">{day.en}</Text>
              {openingHours?.[day.en]?.ranges ? (
                <View className="flex flex-col items-end">
                  {openingHours[day.en]?.ranges?.map((range, index) => (
                    <Text key={index} className="text-sm md:text-md">
                      {`${range.from}H - ${range?.to!}H`}
                    </Text>
                  ))}
                </View>
              ) : openingHours[day.en]?.openAllDay ? (
                <Text className="text-sm md:text-md">Opened all day</Text>
              ) : (
                <Text className="text-sm md:text-md">Closed</Text>
              )}
            </View>
          ))
        ) : (
          <Text className="text-light">Available 24/7</Text>
        )}
      </View>
    </ScrollView>
  );
}
