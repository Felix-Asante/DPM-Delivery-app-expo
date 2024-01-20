// @ts-nocheck
import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonLoading from 'react-native-skeleton-loading';

import Colors from '../../../constants/Colors';

const {width} = Dimensions.get('window');

export default function OrdersSkeleton() {
  return (
    <SkeletonLoading background="#00000" highlight="#f4f4f4">
      <View>
        <View
          style={{
            width,
            borderRadius: 8,
            marginBottom: 6,
            minHeight: 118,
            backgroundColor: Colors.dark.main,
          }}
        />
        <View
          style={{
            width,
            borderRadius: 8,
            marginTop: 3,
            minHeight: 10,
            backgroundColor: Colors.dark.main,
          }}
        />
      </View>
    </SkeletonLoading>
  );
}
