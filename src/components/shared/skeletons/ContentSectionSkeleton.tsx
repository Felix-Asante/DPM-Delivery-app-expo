import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import React from 'react';
import {Dimensions, View} from 'react-native';

import SkeletonSpacer from './SkeletonSpacer';
import Colors from '../../../constants/Colors';

const {width} = Dimensions.get('window');
export default function ContentSectionSkeleton() {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      className="h-full bg-white"
      animate={{backgroundColor: '#fffff'}}>
      <View className="mr-3 mb-2">
        <Skeleton
          colorMode="light"
          height={120}
          radius={10}
          colors={[Colors.light[100], Colors.light[200]]}
          width={width / 2}
        />
        <SkeletonSpacer height={5} />
        <Skeleton
          colorMode="light"
          height={10}
          radius="round"
          colors={[Colors.light[100], Colors.light[200]]}
          width={width / 2}
        />
        <SkeletonSpacer height={5} />
        <Skeleton
          colorMode="light"
          height={10}
          radius="round"
          colors={[Colors.light[100], Colors.light[200]]}
          width={width / 3}
        />
        <SkeletonSpacer height={8} />
      </View>
    </MotiView>
  );
}
