import React, {ReactNode, forwardRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {Text, TextInput, TextInputProps, View} from 'react-native';

import Colors from '../../../constants/Colors';
import {mergeClassNames} from '../../../utils/helpers';

export interface InputProps extends TextInputProps {
  label?: string;
  className?: string;
  defaultValue?: string;
  name: string;
  control: any;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
const Input = forwardRef(function Input(props: InputProps, ref: any) {
  const {
    name,
    label,
    defaultValue,
    startContent,
    endContent,
    control,
    className,
    ...rest
  } = props;
  const {field, fieldState} = useController({
    name,
    defaultValue,
    control,
  });
  const [focused, setFocused] = useState(false);
  return (
    <View className={mergeClassNames('mb-3', className)}>
      {label && <Text className="text-sm text-dark mb-1">{label}</Text>}
      <View
        className={mergeClassNames(
          'bg-light-100 text-light border-2 border-light/20  px-2.5 py-1 h-[53px] rounded-lg relative ',
          !rest.editable && 'bg-gray-200',
          focused && 'bg-primary-100/10 text-dark  border-primary',
        )}>
        <View className="absolute top-[30%] left-2">{startContent}</View>
        <TextInput
          className={mergeClassNames(
            '"bg-transparent h-full ml-2 text-light font-semibold  py-0"',
            startContent && 'ml-7',
          )}
          defaultValue={defaultValue}
          {...field}
          {...rest}
          placeholderTextColor={Colors.light.main}
          onChangeText={field.onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={ref}
        />
        <View className="absolute top-[28%] right-2">{endContent}</View>
      </View>
      {fieldState.error && (
        <Text className="text-red-500 text-sm font-medium">
          {fieldState?.error?.message}
        </Text>
      )}
    </View>
  );
});

export default Input;
