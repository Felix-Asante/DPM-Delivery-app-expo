import NetInfo from '@react-native-community/netinfo';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {WifiOffIcon} from 'lucide-react-native';
import {useEffect, useState} from 'react';

import Providers from '../components/Providers';
import ErrorMessage from '../components/shared/errors/ErrorMessage';
import Colors from '../constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: '(onboarding)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isConnectedToInternet, setIsConnectedToInternet] = useState<
    boolean | null
  >(null);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    console.log('error', error);
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // listen for internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnectedToInternet(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  if (!loaded) {
    return null;
  }

  if (!isConnectedToInternet)
    return (
      <ErrorMessage
        title="Internet not connected"
        illustration={
          <WifiOffIcon size={95} color={Colors.primary.main} className="mb-3" />
        }
        description="Make sure your internet is accessible"
      />
    );

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Providers>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(main)/Home" options={{headerShown: false}} />
        <Stack.Screen name="(onboarding)" options={{headerShown: false}} />
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
      </Stack>
    </Providers>
  );
}
