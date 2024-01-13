import {useLocalSearchParams} from 'expo-router';
import React from 'react';
import {View, Text} from 'react-native';

export default function PlacePage() {
  const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>PlacePage {id}</Text>
    </View>
  );
}
