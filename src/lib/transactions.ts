import {makeApiRequest} from './apiHandler';
import {MakePaymentDto} from '../types/dto/transactions';
import {apiConfig} from '../utils/apiConfig';

export function makePayment(data: MakePaymentDto) {
  const endpoint = apiConfig.transactions.acceptPayment();
  return makeApiRequest({method: 'post', endpoint, data});
}
