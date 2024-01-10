import * as z from 'zod';

export const passwordValidation = z
  .string({
    required_error: 'Password required',
    invalid_type_error: 'Invalid password format',
  })
  .min(8, 'Password should contain at least 8 characters');

export const emailValidation = z
  .string({
    required_error: 'Email required',
    invalid_type_error: 'Invalid email',
  })
  .email('Invalid email');

export const loginValidations = z.object({
  phone: z.string({
    required_error: 'Phone number is required',
    invalid_type_error: 'Invalid phone number',
  }),
  // .regex(regexPattern.Phone, ERRORS.AUTH.PHONE.invalid),

  password: passwordValidation,
});

export type LoginDto = z.infer<typeof loginValidations>;

export const signupValidationSchema = z.object({
  phone: z.string({
    required_error: 'Phone number is required',
    invalid_type_error: 'Invalid phone number',
  }),
  // .regex(regexPattern.Phone, ''Invalid phone number''),

  password: passwordValidation,
  fullName: z.string({required_error: 'Name is required'}),
});

export type SignupDto = z.infer<typeof signupValidationSchema>;
