import {useMutation} from '@tanstack/react-query';
import {Link, useRouter} from 'expo-router';
import {PhoneIcon} from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Container from '../../../components/shared/Container';
import PasswordInput from '../../../components/shared/inputs/PasswordInput';
import Input from '../../../components/shared/inputs/index';
import {TOKEN_KEY} from '../../../constants';
import Colors from '../../../constants/Colors';
import {useReactHookForm} from '../../../hooks/useReactHookForm';
import {login} from '../../../lib/auth';
import {getErrorMessage, saveToSecureStore} from '../../../utils/helpers';
import {toastErrorMessage} from '../../../utils/toast';
import {LoginDto, loginValidations} from '../../../validations/auth';
export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useReactHookForm<LoginDto>({schema: loginValidations});

  const router = useRouter();

  const loginMutation = useMutation({mutationFn: login});

  const loginUser = (data: LoginDto) => {
    loginMutation.mutate(data, {
      onSuccess(data) {
        saveToSecureStore(TOKEN_KEY, data?.accessToken);
        router.replace('/(main)/Home/home');
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
          <View className="h-full justify-center items-center w-[88%] mx-auto">
            <Image
              source={require('../../../../assets/images/app-logo.jpeg')}
              className="w-48 h-32"
            />
            <Text className="text-dark capitalize text-xl mb-8 font-bold">
              Login to Your Account
            </Text>
            <View className="w-full mb-2">
              <Input
                startContent={<PhoneIcon color={Colors.light.main} size={22} />}
                name="phone"
                placeholder="024 **** ***"
                control={control}
                keyboardType="phone-pad"
                className="mb-8"
              />

              <PasswordInput
                name="password"
                control={control}
                placeholder="Password"
              />
            </View>
            <Link className="mb-4 self-end" href="/(auth)/auth/forgotPassword">
              Forgot password?
            </Link>
            <CustomButton
              label="Sign in"
              onPress={handleSubmit(loginUser)}
              disabled={!isValid}
              loading={loginMutation.isPending}
            />
            <View className="flex-row gap-1">
              <Text className="text-sm text-dark font-medium">
                Don't have account?
              </Text>
              <Link href="/(auth)/auth/register">
                <Text className="text-sm text-primary font-medium">
                  Sign up
                </Text>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  );
}
