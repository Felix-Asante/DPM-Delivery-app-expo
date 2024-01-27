import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import Colors from '../constants/Colors';

export default function FullScreenLoader() {
  return (
    <View className="h-full bg-white items-center justify-center">
      <ActivityIndicator color={Colors.primary.main} size="large" />
    </View>
  );
}
