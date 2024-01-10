import {makeApiRequest} from './apiHandler';
import {User} from '../types/auth';
import {apiConfig} from '../utils/apiConfig';
import {LoginDto, SignupDto} from '../validations/auth';

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
