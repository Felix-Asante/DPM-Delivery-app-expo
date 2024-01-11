import React, {useEffect, useRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';

import Colors from '../../../constants/Colors';
import {mergeClassNames} from '../../../utils/helpers';

interface OtpProps {
  length?: number;
  editable?: boolean;
  defaultValue?: string;
  name: string;
  //   onChange: (otp: string) => void;
  control: any;
}
export default function OTPInput(props: OtpProps) {
  const {length = 4, control, name, editable = true, defaultValue = ''} = props;

  const [focused, setFocused] = useState(false);

  const inputRefs = useRef(Array(length).fill(null));
  const handleInputChange = (value: string, index: number) => {
    if (/^\d$|^$/.test(value)) {
      const updatedValues = [...otpValues];
      updatedValues[index] = value;
      setOTPValues(updatedValues);
      if (index < length - 1 && value !== '') {
        inputRefs.current[index + 1].focus();
      } else {
        value !== '' && Keyboard.dismiss();
      }
    }
  };

  const handleInputKeyDown = (key: string | undefined, index: number) => {
    if (key === 'Backspace' && index > 0 && otpValues[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const {field, fieldState} = useController({
    name,
    control,
    defaultValue,
  });

  const [otpValues, setOTPValues] = useState(
    defaultValue.split('').concat(Array(length - defaultValue.length).fill('')),
  );

  useEffect(() => {
    if (otpValues) {
      field.onChange(otpValues.join(''));
    }
  }, [otpValues]);

  return (
    <View className="mt-8 mb-12 flex flex-row justify-center">
      {otpValues.map((value, index) => (
        <View
          key={index}
          className={mergeClassNames(
            'bg-light-100  border-2 border-light/20 w-1/5 px-2.5 py-1 h-[53px] rounded-lg relative',
            !editable && 'bg-gray-200',
            focused && 'bg-primary-100/10 text-dark  border-primary',
            length - 1 !== index && 'mr-5',
          )}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TextInput
              className={mergeClassNames(
                'bg-transparent h-full font-semibold text-light py-0 text-center text-2xl align-middle',
              )}
              ref={el => (inputRefs.current[index] = el)}
              value={value}
              placeholderTextColor={Colors.light.main}
              onChangeText={value => handleInputChange(value, index)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyPress={e => handleInputKeyDown(e?.nativeEvent.key, index)}
              inputMode="numeric"
            />
          </KeyboardAvoidingView>
        </View>
      ))}
      {fieldState.error && (
        <Text className="text-red-500 text-sm font-medium">
          {fieldState?.error?.message}
        </Text>
      )}
    </View>
  );
}
