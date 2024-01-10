import {Link, useRouter} from 'expo-router';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Swiper from 'react-native-swiper';

import {SKIP_ONBOARDING_KEY} from '../../constants';
import Colors from '../../constants/Colors';
import {saveToSecureStore} from '../../utils/helpers';

const CONTENT = [
  {
    image: require('../../../assets/images/onboarding/order.png'),
    title: 'Buy from your favorite stores near you',
    subTitle: 'We have all your favorite stores available to take your orders',
  },
  {
    image: require('../../../assets/images/onboarding/focus.png'),
    title: 'Focus on your Busy schedules, let us do the delivery',
    subTitle:
      'We know you are busy, Focus on it, Just order it and we will deliver',
  },
  {
    image: require('../../../assets/images/onboarding/deliver.png'),
    title: 'Fast delivery',
    subTitle: 'We deliver on time based on your location! Just order it',
  },
];
export default function Onboarding() {
  const router = useRouter();
  return (
    <View className="h-full bg-primary">
      <View className="bg-white px-2 pt-14 h-[80%] rounded-b-3xl">
        <TouchableOpacity
          onPress={async () => {
            // store skip
            await saveToSecureStore(SKIP_ONBOARDING_KEY, true);
            router.replace('/(app)/(home)/home');
          }}
          className="items-end mb-2 pr-3">
          <Text className="text-dark">Skip</Text>
        </TouchableOpacity>
        <Swiper
          showsButtons={false}
          dotColor={Colors.primary[100]}
          activeDotColor={Colors.primary.main}>
          {CONTENT.map((content, i) => (
            <View className="items-center justify-center h-[90%]" key={i}>
              <Image
                source={content.image}
                className="object-fit w-[70%] h-[250px]"
              />
              <Text className="font-bold text-black text-center text-2xl w-[80%] mb-3.5">
                {content.title}
              </Text>
              <Text className="w-[60%] text-center">{content.subTitle}</Text>
            </View>
          ))}
        </Swiper>
      </View>
      <View className="mt-10 px-4 h-full">
        <TouchableOpacity
          onPress={() => {
            router.push('/(auth)/auth/login');
          }}
          className="bg-white rounded-md py-2 px-3 w-[90%] ml-4 mb-2">
          <Text className="text-primary text-center font-bold text-lg">
            Sign In
          </Text>
        </TouchableOpacity>

        <Link
          href="/(auth)/auth/register"
          className="text-white text-center font-medium">
          Visiting for the first time? Sign Up
        </Link>
      </View>
    </View>
  );
}
