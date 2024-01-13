import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'expo-router';
import {Gauge, Heart, Star} from 'lucide-react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {View, Image, Text, TouchableOpacity, Pressable} from 'react-native';

import Colors from '../../../constants/Colors';
import {Place} from '../../../types/place';
import {calculateDiscount} from '../../../utils/helpers';
import {
  calculateDistance,
  getEstimatedDeliveryTime,
} from '../../../utils/helpers/location';

const TOTAL_CHARACTERS = 15;

interface Props {
  place: Place;
  isOffer?: boolean;
  width?: string;
  imageHeight?: string;
  reductionPercent?: number;
  price?: number;
}
export default function ContentCard({
  place,
  isOffer = false,
  width = 'w-52',
  imageHeight = 'h-[115px]',
  reductionPercent = 0,
  price = 0,
}: Props) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const placePosition = {
    latitude: +place?.latitude,
    longitude: +place?.longitude,
  };
  const userPosition = {
    latitude: +place?.latitude,
    longitude: +place?.longitude,
  };

  const distance = calculateDistance({position: placePosition, userPosition});

  const goToPlaceScreen = () => {
    router.push({
      pathname: '/(main)/Home/profile',
      params: {id: place?.id},
    });
  };

  return (
    <View className={`mr-4 ${width} relative`}>
      <Pressable
        onPress={goToPlaceScreen}
        className={`w-full ${imageHeight} relative`}>
        <Image
          source={{uri: place.mainImage}}
          // src={place?.mainImage}
          alt="place_image"
          className="object-cover rounded-xl h-full w-full"
          resizeMode="cover"
          defaultSource={require('../../../../assets/images/default-img.jpeg')}
        />
        {isOffer && reductionPercent > 0 && (
          <View className="bg-primary  rounded-full py-[2px] px-2 absolute top-1 left-1">
            <Text className="font-medium text-white text-center">
              -{reductionPercent}%
            </Text>
          </View>
        )}
        {distance && (
          <View className="flex flex-row items-center  bg-white rounded-sm py-1 px-2 absolute bottom-1 right-1">
            <Gauge size={17} color={Colors.primary.main} strokeWidth={3} />
            <Text className="font-medium text-dark text-sm text-center ml-2">
              {getEstimatedDeliveryTime({
                distance: Number(distance),
                prepTime: place?.minPrepTime,
              })}
              -
              {getEstimatedDeliveryTime({
                distance: Number(distance),
                prepTime: place?.maxPrepTime,
              })}{' '}
              min
            </Text>
          </View>
        )}
      </Pressable>
      <TouchableOpacity className="flex flex-row items-center justify-between my-1">
        <TouchableOpacity onPress={goToPlaceScreen}>
          <Text className="font-medium text-base md:text-lg  text-dark  line-clamp-1 capitalize">
            {place?.name.substring(0, TOTAL_CHARACTERS)}
            {place?.name.length > TOTAL_CHARACTERS ? '...' : ''}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-x-1">
          <Star size={15} color={Colors.dark.main} />
          <Text className="font-medium text-sm text-dark">4.5</Text>
        </View>
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-between gap-x-3">
        <View className="flex flex-row items-center gap-x-2">
          {(place?.averagePrice > 0 || price) && (
            <Text
              className={`text-light font-medium ${isOffer && 'line-through'}`}>
              GH₵ {isOffer ? price : place?.averagePrice}
            </Text>
          )}
          {isOffer && (
            <Pressable className=" bg-primary py-1 px-2 rounded-full">
              <Text className="text-white font-medium">
                GH₵ {calculateDiscount(price, reductionPercent)}
              </Text>
            </Pressable>
          )}
        </View>

        {/* <TouchableOpacity
          onPress={toggleLike}
          className="absolute right-2 -top-[145px]">
          <Heart
            size={20}
            color={theme.colors.primary.main}
            fill={liked ? theme.colors.primary.main : theme.colors.primary[100]}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
