export type ClientHttpRequestData = {
  [key: string]: string | number;
};

export type ClientHttpRequest = {
  url: string;
  params?: ClientHttpRequestData;
};

export type ClientHttpResponse<T> = {
  statusCode: number;
  body: T;
};

export interface ClientHttpAdapter {
  get: <T>(
    url: string,
    params?: ClientHttpRequestData,
  ) => Promise<ClientHttpResponse<T>>;
}

export class ClientHttpError extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
  }
}
