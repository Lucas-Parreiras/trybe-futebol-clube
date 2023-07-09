export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSucess<T> = {
  status: 'SUCESSFUL',
  data: T
};

export type ServResponse<T> = ServiceResponseError | ServiceResponseSucess<T>;
