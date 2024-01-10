import {Stack} from 'expo-router';
import {StatusBar, View} from 'react-native';

export default function HomeLayout() {
  return (
    <View className="h-full">
      <StatusBar animated barStyle="dark-content" />
      <View className="h-full">
        <Stack
          screenOptions={{
            headerTitle: '',
            headerTransparent: true,
          }}
        />
      </View>
    </View>
  );
}
