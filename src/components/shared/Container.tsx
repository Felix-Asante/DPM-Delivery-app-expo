import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

import {mergeClassNames} from '../../utils/helpers';

type ContainerProps = PropsWithChildren<{className?: string}>;
export default function Container({children, className}: ContainerProps) {
  return (
    <View className={mergeClassNames('pt-6 px-1 relative', className)}>
      {children}
    </View>
  );
}
