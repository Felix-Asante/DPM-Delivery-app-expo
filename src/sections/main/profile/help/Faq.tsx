import {useRouter} from 'expo-router';
import {ChevronRightIcon} from 'lucide-react-native';
import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import Colors from '../../../../constants/Colors';

const SECTIONS = [
  {
    title: 'What is DPM Delivery?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur alias a neque quidem porro maxime deserunt. Quam dolore repellat excepturi!',
  },
  {
    title: 'How can i make payment?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur alias a neque quidem porro maxime deserunt. Quam dolore repellat excepturi!',
  },
  {
    title: 'How can i cancel orders?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur alias a neque quidem porro maxime deserunt. Quam dolore repellat excepturi!',
  },
  {
    title: 'How can i delete my account?',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur alias a neque quidem porro maxime deserunt. Quam dolore repellat excepturi!',
  },
];
export default function Faq() {
  const router = useRouter();
  return (
    <ScrollView className="mt-4">
      {SECTIONS.map((faq, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            router.push({
              pathname: '/(main)/profile/faq',
              params: {title: faq.title, content: faq.content},
            });
          }}
          className="px-2 py-4 flex flex-row items-center justify-between border-b border-light-200">
          <Text className="text-black">{faq.title}</Text>
          <ChevronRightIcon size={20} color={Colors.black.main} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
