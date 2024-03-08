import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import Colors from '../../../constants/Colors';
import {mergeClassNames} from '../../../utils/helpers';

interface Button {
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
  labelClassName?: string;
  label: string;
}
export default function CustomButton(props: Button) {
  const {
    disabled = false,
    loading = false,
    className,
    labelClassName,
    label,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      onPress={!disabled && onPress && !loading ? onPress : undefined}
      className={mergeClassNames(
        'bg-primary p-3 rounded-md w-full',
        disabled && 'bg-light',
        loading && 'py-3.5',
        className,
      )}>
      {!loading ? (
        <Text
          className={mergeClassNames(
            'text-base text-white text-center',
            labelClassName,
          )}>
          {label}
        </Text>
      ) : (
        <ActivityIndicator color={Colors.light[200]} />
      )}
    </TouchableOpacity>
  );
}
