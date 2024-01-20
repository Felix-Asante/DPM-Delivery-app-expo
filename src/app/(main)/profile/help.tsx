import {Stack, useRouter} from 'expo-router';
import {ChevronLeftIcon} from 'lucide-react-native';
import React from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/shared/Tabs';
import Colors from '../../../constants/Colors';
import Faq from '../../../sections/main/profile/help/Faq';
import Support from '../../../sections/main/profile/help/Support';

export default function HelpScreen() {
  const router = useRouter();
  return (
    <View className="bg-white h-full pt-16">
      <StatusBar barStyle="dark-content" />
      <Pressable
        onPress={() => router.back()}
        className="flex flex-row items-center pl-2 mb-8">
        <ChevronLeftIcon size={30} color={Colors.black.main} />
        <Text className="ml-3 text-lg font-semibold text-black">Help</Text>
      </Pressable>
      <Tabs defaultValue="faq" className="px-2">
        <TabsList>
          <TabsTrigger id="faq" title="Frequently Asked Questions" />
          <TabsTrigger id="support" title="Support" />
        </TabsList>
        <TabsContent key="faq" value="faq">
          <Faq />
        </TabsContent>
        <TabsContent key="support" value="support">
          <Support />
        </TabsContent>
      </Tabs>
      <Text>HelpScreen</Text>
    </View>
  );
}
