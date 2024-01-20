import {CheckIcon} from 'lucide-react-native';
import React, {useState} from 'react';
import {Pressable, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  onChange?: (val: boolean) => void;
  value?: boolean;
  label?: string;
  className?: string;
}
export default function CheckBox({onChange, value = false, label}: Props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(value);
  return (
    <TouchableOpacity className="flex flex-row items-center">
      <TouchableOpacity
        onPress={() => {
          setToggleCheckBox(toggle => !toggle);
          onChange && onChange(!toggleCheckBox);
        }}
        className={` border-light-200 rounded-md h-6 w-6 flex items-center justify-center ${
          toggleCheckBox ? 'bg-primary' : 'bg-transparent border'
        }`}>
        {toggleCheckBox && <CheckIcon width={15} color="#fff" />}
      </TouchableOpacity>
      {label && <Text className="ml-1.5 text-black">{label}</Text>}
    </TouchableOpacity>
  );
}
