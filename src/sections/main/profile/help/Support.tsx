import {Facebook, Instagram, Mail, Phone, Twitter} from 'lucide-react-native';
import React, {useCallback} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';

import Colors from '../../../../constants/Colors';

const ELEMENTS = [
  {
    icon: Mail,
    title: 'Email Address',
    value: 'support@dpmdelivery.com',
  },
  {
    icon: Phone,
    title: 'Telephone Number',
    value: '020 0000 000',
  },
];

const URLS = {
  FB: {
    url1: 'https://www.facebook.com/felix.asante.186?mibextid=LQQJ4d',
    url2: 'https://www.facebook.com/felix.asante.186?mibextid=LQQJ4d',
  },
  IG: {
    url1: 'https://instagram.com/felixx_asante?igshid=MmIzYWVlNDQ5Yg==',
    url2: 'https://instagram.com/felixx_asante?igshid=MmIzYWVlNDQ5Yg==',
  },
  TWT: {
    url1: 'https://www.facebook.com/felix.asante.186?mibextid=LQQJ4d',
    url2: 'https://www.facebook.com/felix.asante.186?mibextid=LQQJ4d',
  },
};
export default function Support() {
  const openLink = useCallback(async (url: string, url2: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(url2);
    }
  }, []);
  return (
    <View className="items-center pt-5">
      <Image
        source={require('../../../../../assets/images/support.png')}
        className="w-[200px] h-[200px]"
      />
      <Text className="font-medium text-black mb-5">
        We're here to help, so don't hesitate to contact us.
      </Text>
      {ELEMENTS.map((element, i) => (
        <View key={i} className="flex-row items-center mb-6 w-56">
          <View className="w-10 h-10 items-center justify-center rounded-full mr-3 bg-black/75">
            <element.icon size={20} color={Colors.primary.main} />
          </View>
          <View>
            <Text className=" text-sm text-black">{element.title}</Text>
            <Text className="font-medium text-black">{element.value}</Text>
          </View>
        </View>
      ))}

      <Text className="font-medium mt-3">
        Follow us on our social media platforms
      </Text>
      <View className="flex-row justify-center mt-3">
        <TouchableOpacity
          onPress={() => openLink(URLS.FB.url1, URLS.FB.url2)}
          className="w-8 h-8 border border-light-200 items-center justify-center rounded-full">
          <Facebook
            size={18}
            fill={Colors.primary.main}
            stroke={Colors.primary.main}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink(URLS.IG.url1, URLS.IG.url2)}
          className=" mx-4 w-8 h-8 border border-light-200 items-center justify-center rounded-full">
          <Instagram size={18} color={Colors.primary.main} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink(URLS.FB.url1, URLS.FB.url2)}
          className="w-8 h-8 border border-light-200 items-center justify-center rounded-full">
          <Twitter
            size={18}
            fill={Colors.primary.main}
            stroke={Colors.primary.main}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
