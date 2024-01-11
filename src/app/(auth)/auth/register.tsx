import {useMutation} from '@tanstack/react-query';
import {Link, useRouter} from 'expo-router';
import {Phone, User2} from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Container from '../../../components/shared/Container';
import Input from '../../../components/shared/inputs';
import PasswordInput from '../../../components/shared/inputs/PasswordInput';
import Colors from '../../../constants/Colors';
import {useReactHookForm} from '../../../hooks/useReactHookForm';
import {signUp} from '../../../lib/auth';
import {getErrorMessage} from '../../../utils/helpers';
import {toastErrorMessage} from '../../../utils/toast';
import {SignupDto, signupValidationSchema} from '../../../validations/auth';

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useReactHookForm<SignupDto>({schema: signupValidationSchema});

  const createUserMutation = useMutation({mutationFn: signUp});

  const router = useRouter();

  const register = (data: SignupDto) => {
    createUserMutation.mutate(data, {
      onSuccess() {
        router.replace('/(auth)/auth/otp');
      },
      onError(error) {
        toastErrorMessage(getErrorMessage(error));
      },
    });
  };

  return (
    <SafeAreaView className="h-full bg-white ">
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className="h-full justify-center items-center bg-white w-[88%] mx-auto">
            <Image
              source={require('../../../../assets/images/app-logo.jpeg')}
              className="w-48 h-32"
            />
            <Text className="text-dark capitalize text-xl mb-8 font-bold">
              Create new account
            </Text>
            <View className="w-full mb-4">
              <Input
                startContent={<Phone color={Colors.light.main} size={20} />}
                placeholder="Phone number"
                control={control}
                keyboardType="phone-pad"
                name="phone"
              />

              <Input
                startContent={<User2 color={Colors.light.main} size={20} />}
                placeholder="Full Name"
                name="fullName"
                control={control}
              />
              <PasswordInput
                name="password"
                placeholder="Password"
                control={control}
              />
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm Password"
                control={control}
              />
            </View>
            <CustomButton
              label="Sign up"
              onPress={handleSubmit(register)}
              loading={createUserMutation.isPending}
              disabled={!isValid}
            />
            <View className="flex-row gap-1">
              <Text className="text-sm text-dark font-medium">
                Already have an account?
              </Text>

              <Link href="/(auth)/auth/login">
                <Text className="text-sm text-primary font-medium">
                  Sign in
                </Text>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
}
