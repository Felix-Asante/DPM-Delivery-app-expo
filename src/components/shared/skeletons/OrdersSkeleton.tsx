import {MotiView} from 'moti';
import {Skeleton} from 'moti/skeleton';
import React, {Fragment} from 'react';
import {Dimensions} from 'react-native';

import SkeletonSpacer from './SkeletonSpacer';
import Colors from '../../../constants/Colors';

const {width} = Dimensions.get('window');

export default function OrdersSkeleton() {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      className="h-full bg-white"
      animate={{backgroundColor: '#fffff'}}>
      {[1, 2, 3, 4].map(i => (
        <Fragment key={i}>
          <Skeleton
            colorMode="light"
            height={120}
            radius={10}
            colors={[Colors.light[100], Colors.light[200]]}
            width={width - 40}
          />
          <SkeletonSpacer height={8} />
        </Fragment>
      ))}
    </MotiView>
  );
}
