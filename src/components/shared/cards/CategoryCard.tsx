import React from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';

import {Category} from '../../../types/category';
import {mergeClassNames} from '../../../utils/helpers';

interface Props {
  category: Category;
  className?: string;
}

export default function CategoryCard({category, className}: Props) {
  // before:absolute before:left-0 before:top-0 before:w-full before:-full before:bg-dark/10 before:-z-[2]
  return (
    <View
      className={mergeClassNames(
        'rounded-md relative w-32 mr-3 z-10 h-20',
        className,
      )}>
      <ImageBackground
        source={{uri: category?.image}}
        resizeMode="contain"
        className="w-full h-full justify-center">
        <View className="bg-dark/20 h-full w-full justify-center items-center rounded-md">
          <Text className="text-primary text-sm font-bold">
            {category.name}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
