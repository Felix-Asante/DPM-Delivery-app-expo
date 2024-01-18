// @ts-nocheck
import React from 'react';
import {View, Text} from 'react-native';
import SkeletonLoading from 'react-native-skeleton-loading';

import Colors from '../../../constants/Colors';

export default function ServicesSkeleton() {
  return (
    <SkeletonLoading background="#00000" highlight="#f4f4f4">
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 20,
          marginBottom: 10,
        }}>
        <View style={{width: '70%', height: 20}}>
          <View
            style={{
              width: '100%',
              borderRadius: 8,
              marginBottom: 6,
              minHeight: 70,
              backgroundColor: Colors.dark.main,
            }}
          />
          <View
            style={{
              width: '100%',
              borderRadius: 5,
              marginBottom: 6,
              minHeight: 10,
              backgroundColor: Colors.dark.main,
            }}
          />
        </View>
        <View
          style={{
            width: '25%',
            borderRadius: 8,
            marginTop: 3,
            minHeight: 70,
            backgroundColor: Colors.dark.main,
          }}
        />
      </View>
    </SkeletonLoading>
  );
}
