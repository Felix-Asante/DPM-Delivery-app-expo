import {ServerCrashIcon} from 'lucide-react-native';
import React, {ReactNode} from 'react';
import {View, Text} from 'react-native';

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
        <ServerCrashIcon
          size={100}
          color={Colors.light.main}
          className="mb-3"
        />
      )}
      <Text className="font-bold text-lg mb-1">{title}</Text>
      <Text className="text-light mb-1">{description}</Text>
      {action}
    </View>
  );
}
