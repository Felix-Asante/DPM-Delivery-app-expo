import {useMutation} from '@tanstack/react-query';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import {PhoneIcon} from 'lucide-react-native';
import React from 'react';
import {View, Text, Image, Platform, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import GoBack from '../../../components/GoBack';
import CustomButton from '../../../components/shared/Buttons/CustomButton';
import Container from '../../../components/shared/Container';
import PasswordInput from '../../../components/shared/inputs/PasswordInput';
import Input from '../../../components/shared/inputs/index';
import {LOCATION_KEY, TOKEN_KEY} from '../../../constants';
import Colors from '../../../constants/Colors';
import {useReactHookForm} from '../../../hooks/useReactHookForm';
import {login} from '../../../lib/auth';
import {useAuthStore} from '../../../store/useAuth';
import {
  getErrorMessage,
  getFromSecureStore,
  saveToSecureStore,
} from '../../../utils/helpers';
import {toastErrorMessage} from '../../../utils/toast';
import {LoginDto, loginValidations} from '../../../validations/auth';
export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useReactHookForm<LoginDto>({schema: loginValidations});

  const router = useRouter();
  const {setUser} = useAuthStore();

  const {canGoBack} = useLocalSearchParams();

  const loginMutation = useMutation({mutationFn: login});

  const loginUser = (data: LoginDto) => {
    loginMutation.mutate(data, {
      async onSuccess(data) {
        await saveToSecureStore(TOKEN_KEY, data?.accessToken);
        setUser(data?.user);
        const location = await getFromSecureStore(LOCATION_KEY);
        if (location) {
          router.replace('/(main)/Home/home');
          return;
        }
        router.replace('/(main)/location');
      },
      onError(error) {
        toastErrorMessage(getErrorMessage(error));
      },
    });
  };
  return (
    <SafeAreaView className="h-full bg-white ">
      <Container>
        {canGoBack === 'true' && <GoBack label="Back" />}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className="h-[90%] justify-center items-center w-[88%] mx-auto">
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
