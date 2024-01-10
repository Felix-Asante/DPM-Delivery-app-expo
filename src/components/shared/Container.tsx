import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

type ContainerProps = PropsWithChildren<object>;
export default function Container({children}: ContainerProps) {
  return <View className="pt-6 px-1 relative">{children}</View>;
}
