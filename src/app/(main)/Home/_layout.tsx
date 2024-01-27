import {Tabs, useRouter} from 'expo-router';
import {FileText, Home, Search, User2} from 'lucide-react-native';
import React, {Fragment} from 'react';
import {Pressable, View} from 'react-native';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Colors from '../../../constants/Colors';
import {useCart} from '../../../store/useCart';
export default function AppHomeLayout() {
  const {cart} = useCart();
  const router = useRouter();
  return (
    <View className="relative h-full">
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
      {cart?.length > 0 && (
        <Pressable className="w-full bg-white p-4 border-b border-light-200 absolute bottom-[7.2%]">
          <CustomButton
            label={`Checkout ${cart.length} ${
              cart.length > 1 ? 'items' : 'item'
            }`}
            onPress={() => router.push('/(main)/cart')}
          />
        </Pressable>
      )}
    </View>
  );
}
