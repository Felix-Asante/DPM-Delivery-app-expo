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

export const signupValidationSchema = z
  .object({
    phone: z.string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Invalid phone number',
    }),
    // .regex(regexPattern.Phone, ''Invalid phone number''),

    password: passwordValidation,
    confirmPassword: passwordValidation,
    fullName: z.string({required_error: 'Name is required'}),
  })
  .refine(({password, confirmPassword}) => password === confirmPassword, {
    message: 'Passwords are not the same',
    path: ['confirmPassword'],
  });

export type SignupDto = z.infer<typeof signupValidationSchema>;

export const changePasswordValidation = z
  .object({
    newPassword: passwordValidation,
    confirmPassword: passwordValidation,
    code: z.string({required_error: 'Provide the confirmation code'}).min(4),
  })
  .refine(({newPassword, confirmPassword}) => newPassword === confirmPassword, {
    message: 'Passwords are not the same',
    path: ['confirmPassword'],
  });

export type ChangePasswordDto = z.infer<typeof changePasswordValidation>;

export const updateProfileValidation = z.object({
  fullName: z
    .string({required_error: 'fullName is required'})
    .min(4, 'full name should have at least 4 characters'),
  email: z.string({required_error: 'Email is required'}).email(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileValidation>;

export const updatePasswordSchema = z
  .object({
    password: passwordValidation,
    newPassword: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine(data => data.confirmPassword === data.newPassword, {
    path: ['confirm'],
    message: 'Password does not match',
  });

export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;
