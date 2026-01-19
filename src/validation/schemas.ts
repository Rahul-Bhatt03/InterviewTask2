import * as yup from 'yup';

// Common validation messages
const messages = {
  required: 'This field is required',
  email: 'Must be a valid email address',
  min: (field: string, num: number) => `${field} must be at least ${num} characters`,
  max: (field: string, num: number) => `${field} must be less than ${num} characters`,
  passwordMatch: 'Passwords must match',
  strongPassword: 'Password must contain uppercase, lowercase, number, and special character',
  nameMin: 'Name must be at least 2 characters',
  nameMax: 'Name cannot exceed 50 characters',
};

export const emailSchema = yup
  .string()
  .email(messages.email)
  .required(messages.required)
  .max(100, messages.max('Email', 100));

export const nameSchema = yup
  .string()
  .required(messages.required)
  .min(2, messages.nameMin)
  .max(50, messages.nameMax)
  .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces');

export const passwordSchema = yup
  .string()
  .required(messages.required)
  .min(8, messages.min('Password', 8))
  .max(32, messages.max('Password', 32))
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    messages.strongPassword
  );

export const confirmPasswordSchema = (passwordField: string = 'password') => 
  yup
    .string()
    .required(messages.required)
    .oneOf([yup.ref(passwordField)], messages.passwordMatch);

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required(messages.required),
});

export const signupSchema = yup.object().shape({
  fullName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema('password'),
  agreeTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

export const blogSchema = yup.object().shape({
  title: yup
    .string()
    .required(messages.required)
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title cannot exceed 200 characters'),
  content: yup
    .string()
    .required(messages.required)
    .min(50, 'Content must be at least 50 characters')
    .max(10000, 'Content cannot exceed 10000 characters'),
  author: nameSchema,
});

export const validateForm = async <T>(
  schema: yup.ObjectSchema<any>,
  data: T
): Promise<{ isValid: boolean; errors: Record<string, string>; data?: T }> => {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });
    return {
      isValid: true,
      errors: {},
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: { general: 'Validation failed' },
    };
  }
};

export const validateField = async (
  schema: yup.ObjectSchema<any>,
  field: string,
  value: any
): Promise<string | null> => {
  try {
    await schema.validateAt(field, { [field]: value });
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return 'Validation error';
  }
};