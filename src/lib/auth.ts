import axios from 'axios';

import {makeApiRequest} from './apiHandler';
import {User} from '../types/auth';
import {apiConfig} from '../utils/apiConfig';
import {IPhone} from '../validations';
import {
  ChangePasswordDto,
  LoginDto,
  SignupDto,
  UpdatePasswordDto,
  UpdateProfileDto,
} from '../validations/auth';

interface LoginResponse {
  user: User;
  accessToken: string;
}
export async function login(data: LoginDto): Promise<LoginResponse> {
  const endpoint = apiConfig.auth.login();
  const result = await makeApiRequest<LoginResponse>({
    endpoint,
    method: 'post',
    data,
  });
  return result;
}
export async function signUp(data: SignupDto) {
  const endpoint = apiConfig.auth.register();
  const result = await makeApiRequest({
    endpoint,
    method: 'post',
    data,
  });
  return result;
}
export async function verifyAccount(code: string) {
  const endpoint = apiConfig.auth.verify_otp(code);
  const result = await makeApiRequest({
    endpoint,
    method: 'get',
  });
  return result;
}
export async function getResetPasswordCode(data: IPhone) {
  const endpoint = apiConfig.auth.forgot_password();
  const result = await makeApiRequest({
    endpoint,
    method: 'post',
    data,
  });
  return result;
}
export async function resetPassword(data: ChangePasswordDto) {
  const endpoint = apiConfig.auth.reset_password(data.code);
  await makeApiRequest({
    endpoint,
    method: 'post',
    data,
  });
}
export async function getCurrentUser(): Promise<User> {
  const endpoint = apiConfig.user.me();
  const currentUser = await makeApiRequest<User>({
    endpoint,
    method: 'get',
  });
  return currentUser;
}

export async function updateProfileDetails(
  data: UpdateProfileDto,
): Promise<User> {
  const endpoint = apiConfig.user.root();
  return makeApiRequest({endpoint, method: 'put', data});
}

export async function changePassword(data: UpdatePasswordDto) {
  const endpoint = apiConfig.auth.change_password();
  return makeApiRequest({endpoint, method: 'put', data});
}

export async function verifyPaymentAccount(account: string, bankCode: string) {
  const endpoint = apiConfig.paystack.verifyAccount({
    account_number: account,
    bank_code: bankCode,
  });

  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_SECRET_KEY}`,
    },
  });

  return response.data;
}
