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

export const OTP_SEND_FAILED: ApiError = {
  code: 'OTP_SEND_FAILED',
  message: 'Failed to send OTP email',
};

export const OTP_ALREADY_SENT: ApiError = {
  code: 'OTP_ALREADY_SENT',
  message: 'An OTP has already been sent. Please wait until it expires.',
};

export const NOT_FOUND: ApiError = {
  code: 'NOT_FOUND',
  message: 'Requested resource is not found'
}

export const SERVER_ERROR: ApiError = {
  code: "SERVER_ERROR",
  message: "Something went wrong at server side."
}