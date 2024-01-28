import {ServerCrashIcon} from 'lucide-react-native';
import React, {ReactNode} from 'react';
import {View, Text, Image} from 'react-native';

import Colors from '../../../constants/Colors';
import {mergeClassNames} from '../../../utils/helpers';

interface ErrorMessageProps {
  className?: string;
  illustration?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}
export default function ErrorMessage(props: ErrorMessageProps) {
  const {className, illustration, title, description, action} = props;
  return (
    <View
      className={mergeClassNames(
        'h-full w-full justify-center items-center',
        className,
      )}>
      {illustration ? (
        illustration
      ) : (
        <Image
          source={require('../../../../assets/images/not-found.png')}
          className="w-[250px] h-[210px]"
        />
      )}
      <Text className="font-bold text-lg mb-1">{title}</Text>
      <Text className="text-light mb-1 w-[90%] text-center">{description}</Text>
      {action}
    </View>
  );
}
