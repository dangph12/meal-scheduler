export interface ApiResponseType<T = unknown, E = unknown> {
  status: 'success' | 'failed' | 'error';
  message: string;
  data?: T;
  errors?: E;
}

export const ApiResponse = {
  success<T>(message: string, data?: T): ApiResponseType<T, undefined> {
    return {
      status: 'success',
      message,
      data
    };
  },

  failed<E>(message: string, errors?: E): ApiResponseType<undefined, E> {
    return {
      status: 'failed',
      message,
      errors
    };
  },

  error(message: string): ApiResponseType<undefined> {
    return {
      status: 'error',
      message
    };
  }
};
