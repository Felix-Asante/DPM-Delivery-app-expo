import {z} from 'zod';

export const cartValidation = z
  .object({
    email: z.string({required_error: 'Email address is required'}).email(),
    //   phone: z
    //     .string({required_error: 'Phone is required'})
    //     .min(10, {message: 'Phone number must have at least 10 digit'})
    //     .max(13, {message: 'Invalid phone number'}),
    tip: z.string().default('0').optional(),
  })
  .transform(data => ({...data, tip: Number(data.tip)}));

export type BookingExtraFields = z.infer<typeof cartValidation>;
