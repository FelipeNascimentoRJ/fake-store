import axios, {AxiosError} from 'axios';

import {
  ClientHttpError,
  ClientHttpAdapter,
  ClientHttpResponse,
  ClientHttpRequestData,
} from '../../core/protocols/adapter/client-http';

export default class ClientHttpAxiosAdapter implements ClientHttpAdapter {
  public async get(
    url: string,
    params?: ClientHttpRequestData,
  ): Promise<ClientHttpResponse> {
    try {
      if (!url) {
        throw new AxiosError('0', 'url is required');
      }

      const {status: statusCode, data: body} = await axios.get(url, {params});

      return {statusCode, body};
    } catch (error) {
      const {response} = error as AxiosError;

      if (response) {
        throw new ClientHttpError(
          Number(response?.status),
          response?.statusText,
        );
      }

      throw new ClientHttpError(0, (error as Error).message);
    }
  }
}
