import React from 'react';
import {Image, View} from 'react-native';

export default function SplashScreen() {
  return (
    <View className="h-full bg-primary items-center justify-between">
      <Image
        source={require('../../assets/images/splash.jpeg')}
        resizeMode="contain"
      />
    </View>
  );
}
