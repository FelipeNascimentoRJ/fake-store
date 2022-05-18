export type ClientHttpRequestData = {
  [key: string]: string | number;
};

export type ClientHttpRequest = {
  url: string;
  params?: ClientHttpRequestData;
};

export type ClientHttpResponse = {
  statusCode: number;
  body: any[];
};

export interface ClientHttpAdapter {
  get: (
    url: string,
    params?: ClientHttpRequestData,
  ) => Promise<ClientHttpResponse>;
}

export class ClientHttpError extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
  }
}
