import * as z from 'zod';

import regexPattern from '../utils/regexp';

export const phoneValidation = z.object({
  phone: z
    .string({
      required_error: 'Phone number required',
      invalid_type_error: 'Invalid phone number',
    })
    .regex(regexPattern.Phone, 'Invalid phone number'),
});

export interface IPhone {
  phone: z.infer<typeof phoneValidation>;
}
