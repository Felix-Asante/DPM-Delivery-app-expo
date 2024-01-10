import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import React, { useState } from "react";

import Input, { InputProps } from ".";
import Colors from "../../../constants/Colors";

export default function PasswordInput(props: InputProps) {
  const [isPassword, setIsPassword] = useState(true);

  const togglePassword = () => setIsPassword((state) => !state);
  return (
    <Input
      {...props}
      endContent={
        <>
          {isPassword ? (
            <EyeIcon
              color={Colors.light.main}
              size={27}
              onPress={togglePassword}
            />
          ) : (
            <EyeOffIcon
              color={Colors.light.main}
              size={27}
              onPress={togglePassword}
            />
          )}
        </>
      }
      placeholder="Password"
      secureTextEntry={isPassword}
    />
  );
}
