import {Slot, Stack, useFocusEffect, useRouter} from 'expo-router';
import {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SplashScreen from '../../components/SplashScreen';
import {SKIP_ONBOARDING_KEY} from '../../constants';
import {useGlobalStore} from '../../store/global';
import {getFromSecureStore} from '../../utils/helpers';

export default function HomeLayout() {
  const router = useRouter();
  const {userLocation} = useGlobalStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // go to home if onboarding is skipped / already visited
  useFocusEffect(() => {
    (async () => {
      const skip = await getFromSecureStore(SKIP_ONBOARDING_KEY);
      if (skip !== null && skip === 'true') {
        if (userLocation) {
          router.replace('/(main)/Home/home');
        } else {
          router.replace('/(main)/location');
        }
      }
      setShowOnboarding(true);
    })();
  });

  if (!showOnboarding) return <SplashScreen />;
  return (
    <SafeAreaView className="bg-white">
      <View className="h-full">
        <StatusBar animated barStyle="dark-content" />
        <View className="h-full">
          {/* <Stack
            screenOptions={{
              headerTitle: '',
              headerTransparent: true,
            }}
          /> */}
          <Slot />
        </View>
      </View>
    </SafeAreaView>
  );
}
