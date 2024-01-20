import {useRouter} from 'expo-router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LockIcon,
  UserIcon,
} from 'lucide-react-native';
import React from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import GoBack from '../../../components/GoBack';
import Colors from '../../../constants/Colors';

const OPTIONS = [
  {
    label: 'Account details',
    href: '(main)/profile/account/',
    icon: UserIcon,
  },
  {
    label: 'Change password',
    href: '(main)/profile/account/changePassword',
    icon: LockIcon,
  },
];
export default function ProfileStack() {
  const router = useRouter();
  return (
    <View className="bg-white h-full px-3 pt-16">
      <StatusBar barStyle="dark-content" />
      <GoBack label="Profile" />
      {OPTIONS.map(option => (
        <TouchableOpacity
          className="flex flex-row items-center justify-between mb-6"
          key={option.label}
          onPress={() => {
            // @ts-ignore
            router.push(option.href);
          }}>
          <View className="flex flex-row items-center">
            <option.icon size={25} color={Colors.black.main} />
            <Text className="ml-3 capitalize">{option?.label}</Text>
          </View>
          <ChevronRightIcon size={25} color={Colors.light.main} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
