import {Tabs, useRouter} from 'expo-router';
import {FileText, Home, Search, User2} from 'lucide-react-native';
import React, {Fragment} from 'react';
import {Dimensions, Pressable, StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Colors from '../../../constants/Colors';
import {useCart} from '../../../store/useCart';
import {shorten} from '../../../utils/helpers';

const screen = Dimensions.get('screen');

export default function AppHomeLayout() {
  const {cart} = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="relative h-full">
      <StatusBar barStyle="dark-content" />
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({focused}) => (
              <Home
                color={focused ? Colors.primary.main : Colors.light.main}
                size={25}
              />
            ),
            href: '(main)/Home/home',
            headerShown: false,
            tabBarActiveTintColor: Colors.primary.main,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({focused}) => (
              <FileText
                color={focused ? Colors.primary.main : Colors.light.main}
                size={25}
              />
            ),
            href: '(main)/Home/orders',
            headerShown: false,
            tabBarActiveTintColor: Colors.primary.main,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({focused}) => (
              <Search
                color={focused ? Colors.primary.main : Colors.light.main}
                size={25}
              />
            ),
            href: '(main)/Home/search',
            headerShown: false,
            tabBarActiveTintColor: Colors.primary.main,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({focused}) => (
              <User2
                color={focused ? Colors.primary.main : Colors.light.main}
                size={25}
              />
            ),
            href: '(main)/Home/profile/',
            headerShown: false,
            tabBarActiveTintColor: Colors.primary.main,
          }}
        />
      </Tabs>
      {cart !== null ? (
        <Pressable
          className="w-full p-4 border-b border-light-200 absolute"
          style={{bottom: insets.bottom + 48}}>
          <CustomButton
            label={`Checkout ${shorten(cart?.place?.name, 25)}`}
            onPress={() => router.push('/(main)/cart')}
          />
        </Pressable>
      ) : null}
    </View>
  );
}
