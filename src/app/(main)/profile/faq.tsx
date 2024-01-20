import {useLocalSearchParams, useRouter} from 'expo-router';
import {ChevronLeftIcon} from 'lucide-react-native';
import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Pressable} from 'react-native';

import Colors from '../../../constants/Colors';

export default function Faq() {
  const {title, content} = useLocalSearchParams();
  const router = useRouter();
  return (
    <View className="h-full bg-white px-4">
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="pt-5 h-full">
          <Pressable
            onPress={() => router.back()}
            className="flex flex-row items-center mb-5">
            <ChevronLeftIcon size={30} color={Colors.black.main} />
            <Text className="ml-2 font-semibold text-black">Answer</Text>
          </Pressable>
          <Text className="text-lg font-semibold text-black">{title}</Text>
          <View className="bg-light-200 p-3 rounded-md mt-4 max-h-[90%]">
            <Text className="text-black">{content}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
