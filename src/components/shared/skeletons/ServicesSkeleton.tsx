import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import React from 'react';
import {View} from 'react-native';

import SkeletonSpacer from './SkeletonSpacer';
import Colors from '../../../constants/Colors';

export default function ServicesSkeleton() {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      className="h-full bg-white"
      animate={{backgroundColor: '#fffff'}}>
      {[1, 2, 3].map(i => (
        <View key={i} className="mr-3 mb-3 flex flex-row">
          <View className="mr-2 mt-2">
            <Skeleton
              colorMode="light"
              height={10}
              radius="round"
              colors={[Colors.light[100], Colors.light[200]]}
              width="80%"
            />
            <SkeletonSpacer height={5} />
            <Skeleton
              colorMode="light"
              height={10}
              radius="round"
              colors={[Colors.light[100], Colors.light[200]]}
              width="50%"
            />
            <SkeletonSpacer height={8} />
          </View>
          <Skeleton
            colorMode="light"
            height={45}
            radius={10}
            colors={[Colors.light[100], Colors.light[200]]}
            width={80}
          />
        </View>
      ))}
    </MotiView>
  );
}
