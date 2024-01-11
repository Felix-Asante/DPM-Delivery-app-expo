import {Tabs} from 'expo-router';
import {FileText, Home, Search, User2} from 'lucide-react-native';
import React from 'react';

import Colors from '../../../constants/Colors';
export default function AppHomeLayout() {
  return (
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
  );
}
