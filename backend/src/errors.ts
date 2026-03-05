export type ApiError = {
  code: string;
  message: string;
};

export const INVALID_PARAMETERS: ApiError = {
  code: 'INVALID_PARAMETERS',
  message: 'Required parameters are missing',
};

export const INVALID_INPUT: ApiError = {
  code: 'INVALID_INPUT',
  message: 'All fields are required',
};

export const EMAIL_EXIST: ApiError = {
  code: 'EMAIL_EXIST',
  message: 'Email already exists',
};

export const USERNAME_EXISTS: ApiError = {
  code: 'USERNAME_EXISTS',
  message: 'Username already exists',
};

export const INVALID_CREDENTIALS: ApiError = {
  code: 'INVALID_CREDENTIALS',
  message: 'User with given credentials does not exist',
};

export const UNAUTHORIZED: ApiError = {
  code: 'UNAUTHORIZED',
  message: 'Unauthorized access',
};