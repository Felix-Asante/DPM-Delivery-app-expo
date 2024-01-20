import {useRouter} from 'expo-router';
import {ChevronLeftIcon} from 'lucide-react-native';
import React from 'react';
import {Text, Pressable} from 'react-native';

import Colors from '../constants/Colors';

export default function GoBack({label}: {label: string}) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.back()}
      className="flex flex-row items-center  mb-8">
      <ChevronLeftIcon size={30} color={Colors.black.main} />
      <Text className="ml-3 text-lg font-semibold text-black">{label}</Text>
    </Pressable>
  );
}
