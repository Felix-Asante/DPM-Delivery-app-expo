import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {CartItem} from '../../../types/booking';
import {PlaceProducts} from '../../../types/place';
import {calculateDiscount} from '../../../utils/helpers';

interface Props {
  title?: string;
  place: string;
  services: PlaceProducts[];
  deliveryFee?: number;
  onSelect: (service: CartItem) => void;
}
export default function Menu({
  services,
  title = 'Menu',
  deliveryFee = 0,
  place,
  onSelect,
}: Props) {
  return (
    <View>
      {title !== 'UNCATEGORIZED' && (
        <Text className=" text-black text-base font-semibold">{title}</Text>
      )}
      {/* OPTIMIZE WITH FLAT LIST */}
      {services.map(service => {
        const price =
          service?.offers.length > 0
            ? calculateDiscount(
                service.offers?.at(0)?.price!,
                service.offers?.at(0)?.reductionPercent!,
              )
            : service.price;
        return (
          <TouchableOpacity
            onPress={() => {
              onSelect({...service, deliveryFee, price, place});
            }}
            className="border-b border-light-200 py-2 mb-3"
            key={service.id}>
            <View className="flex flex-row items-center">
              <View className="ml-4 flex-1">
                <View className="flex flex-row justify-between items-start">
                  <Text className="font-medium text-dark capitalize">
                    {service.name}
                  </Text>
                </View>
                {service.description && (
                  <View className="flex-row items-center mt-1">
                    <Text className="text-light text-[12px]">
                      {service.description}
                    </Text>
                  </View>
                )}
                <View className="flex-row items-center space-x-5 mt-1">
                  <Text className="font-bold"> GH₵ {price}</Text>
                  {service.offers?.length > 0 && (
                    <Text className="font-bold bg-primary text-white p-1  text-center">
                      {service.offers?.at(0)?.reductionPercent} % GH₵
                      {service?.offers?.at(0)?.price}
                    </Text>
                  )}
                </View>
              </View>
              {service.photo && (
                <Image
                  source={{uri: service.photo}}
                  className="rounded-lg w-[90px] h-[80%] object-cover"
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
