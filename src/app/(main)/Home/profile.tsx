import * as Linking from 'expo-linking';
import {Link, useRouter} from 'expo-router';
import {
  BadgePercent,
  Heart,
  HeartHandshake,
  Share2,
  User2,
} from 'lucide-react-native';
import React, {Fragment, useMemo} from 'react';
import {Text, View, Share} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import {useAuthStore} from '../../../store/useAuth';
import {getInitials} from '../../../utils/helpers';

export default function Profile() {
  const {user} = useAuthStore();
  const router = useRouter();

  const sendInvitation = async () => {
    const url = Linking.createURL('(onboarding)');
    await Share.share(
      {title: 'Invite a friend', url},
      {subject: 'Invite a friend'},
    );
  };
  const Menus = useMemo(() => {
    return [
      {
        label: 'Favorites',
        href: '(main)/profile/favorites',
        icon: Heart,
        params: {type: 'FAVORITES'},
        hide: user === null,
      },
      {
        label: 'Special Offers & Promo',
        href: '(main)/profile/favorites',
        icon: BadgePercent,
        params: {type: 'OFFERS'},
      },
      {
        label: 'Profile',
        href: '(main)/profile/',
        icon: User2,
        params: {},
        hide: user === null,
      },
      {
        label: 'Help',
        href: '(main)/profile/help',
        icon: HeartHandshake,
        params: {},
      },
    ];
  }, [user]);
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5 pt-2">
        <View className="flex flex-row items-center justify-between mb-4">
          <Text className="font-bold text-lg text-dark ">Profile</Text>
        </View>
        {user && (
          <View className=" bg-primary/10 border-primary/50 border px-3 py-3 rounded-md">
            <View className="flex flex-row items-center ">
              <View className="w-11 h-11 items-center justify-center bg-primary rounded-full mr-3">
                <Text className="text-white text-center font-semibold">
                  {getInitials(user?.fullName ?? 'UK')}
                </Text>
              </View>
              <View>
                <Text className="font-medium text-dark capitalize">
                  {user?.fullName}
                </Text>
                <Text className="text-light text-sm">{user?.phone}</Text>
              </View>
            </View>
          </View>
        )}
        <View className={!user ? 'mt-8' : 'mt-11'}>
          {Menus.map(menu => (
            <Fragment key={menu.label}>
              {!menu?.hide ? (
                <TouchableOpacity
                  key={menu.label}
                  onPress={() => {
                    menu.label === 'Profile' && !user
                      ? null
                      : // @ts-ignore
                        router.push({
                          pathname: menu.href,
                          params: menu.params,
                        });
                  }}
                  className="flex flex-row items-center mb-6">
                  <menu.icon size={30} stroke="black" />
                  <Text className="text-black font-normal ml-3 text-[16px]">
                    {menu.label}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </Fragment>
          ))}
          <TouchableOpacity
            onPress={sendInvitation}
            className="flex-row justify-between mt-1 mb-6">
            <View className="flex-row items-center">
              <Share2 size={27} stroke="black" />
              <Text className="text-black font-normal ml-3 text-[16px] capitalize">
                Invite friends
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {!user && (
        <View className="justify-center absolute bottom-[3%] w-full px-4">
          <CustomButton
            label="Login"
            onPress={() =>
              router.push({
                pathname: '/(auth)/auth/login',
                params: {canGoBack: 'true'},
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}
