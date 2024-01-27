import {useRouter} from 'expo-router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LockIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react-native';
import React from 'react';
import {View, Text, StatusBar, Pressable, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import FullScreenLoader from '../../../components/FullScreenLoader';
import GoBack from '../../../components/GoBack';
import Colors from '../../../constants/Colors';
import {useAuthStore} from '../../../store/useAuth';

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
  const {logout, loggingOut} = useAuthStore();

  const logoutHandler = () => {
    logout();
    router.replace('/(main)/Home/home');
  };
  return (
    <>
      {loggingOut ? (
        <FullScreenLoader />
      ) : (
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
                <Text className="ml-3 capitalize text-black">
                  {option?.label}
                </Text>
              </View>
              <ChevronRightIcon size={25} color={Colors.light.main} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="flex flex-row items-center justify-between mb-6 mt-1 ml-1"
            onPress={() => {
              Alert.alert('Logout', ' Are you sure you want to log out?', [
                {
                  text: 'Cancel',
                  // onPress: () => Alert.alert.,
                  style: 'cancel',
                },
                {
                  text: 'Continue',
                  onPress: logoutHandler,
                  style: 'destructive',
                },
              ]);
            }}>
            <View className="flex flex-row items-center">
              <LogOutIcon size={25} color={Colors.primary.main} />
              <Text className="ml-3 capitalize text-primary">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
