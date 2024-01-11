import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import Container from '../../../components/shared/Container';
import ForgotPasswordStepOne from '../../../sections/auth/ForgotPasswordStepOne';
import ForgotPasswordStepTwo from '../../../sections/auth/ForgotPasswordStepTwo';

export default function ForgotPassword() {
  const [activeIndex, setActiveIndex] = useState(0);

  const changeStep = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <SafeAreaView className="h-full bg-white ">
      <Container>
        <View className="w-[80%] mx-auto h-full justify-center">
          {activeIndex === 0 ? (
            <ForgotPasswordStepOne changeStep={changeStep} />
          ) : (
            <ForgotPasswordStepTwo changeStep={changeStep} />
          )}
        </View>
      </Container>
    </SafeAreaView>
  );
}
