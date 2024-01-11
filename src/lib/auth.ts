import {makeApiRequest} from './apiHandler';
import {User} from '../types/auth';
import {apiConfig} from '../utils/apiConfig';
import {IPhone} from '../validations';
import {ChangePasswordDto, LoginDto, SignupDto} from '../validations/auth';

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
