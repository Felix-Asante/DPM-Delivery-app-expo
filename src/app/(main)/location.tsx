import {useRouter} from 'expo-router';
import {Search, XIcon} from 'lucide-react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, Pressable} from 'react-native';

import Input from '../../components/shared/inputs';
import Colors from '../../constants/Colors';

export default function LocationPicker() {
  const router = useRouter();
  const {control} = useForm();
  return (
    <View className="pt-16 px-2">
      <View className="flex-row items-center mb-4">
        <Pressable className="mr-8" onPress={() => router.back()}>
          <XIcon size={25} color={Colors.dark.main} />
        </Pressable>
        <Text className="font-bold text-lg">Delivery Address</Text>
      </View>
      <Input
        startContent={<Search size={20} color={Colors.light.main} />}
        placeholder="Search location"
        name="location"
        control={control}
        autoFocus
      />
    </View>
  );
}
