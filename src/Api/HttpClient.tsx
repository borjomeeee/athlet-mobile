import {
  HttpDefinedRequestCall,
  IHttpClient,
  IHttpClientConfig,
  RequestInfo,
} from './Types';
import {appendParams, attachPath} from './Utils';

import {BadNetworkConnectionError, RequestError} from './Exceptions';
import {Logger} from 'src/Utils/Logger';
import {Config} from 'src/Config';

const defaultOptions: IHttpClientConfig = {
  protocol: 'https',
  domain: 'localhost',

  timeout: Config.badNetworkConnection ? 0 : 10_000,
  logger: {log: Logger.debug},
};

export class HttpClient implements IHttpClient {
  jwtToken?: string;
  #options: IHttpClientConfig;

  constructor(options: Partial<IHttpClientConfig> = {}) {
    this.#options = {...defaultOptions, ...options};
  }

  configure(options: Partial<IHttpClientConfig>) {
    this.#options = {...this.#options, ...options};
    return this;
  }

  authorize(jwtToken: string) {
    this.jwtToken = jwtToken;
    return this;
  }

  deauthorize() {
    this.jwtToken = undefined;
    return this;
  }

  static of(httpClient: HttpClient, options: Partial<IHttpClientConfig> = {}) {
    return new HttpClient({...httpClient.#options, ...options});
  }

  get(requestInfo: Parameters<HttpDefinedRequestCall>[0]) {
    return this.request({...requestInfo, method: 'GET'});
  }

  post(requestInfo: Parameters<HttpDefinedRequestCall>[0]) {
    return this.request({...requestInfo, method: 'POST'});
  }

  update(requestInfo: Parameters<HttpDefinedRequestCall>[0]) {
    return this.request({...requestInfo, method: 'UPDATE'});
  }

  delete(requestInfo: Parameters<HttpDefinedRequestCall>[0]) {
    return this.request({...requestInfo, method: 'DELETE'});
  }

  async request(request: RequestInfo) {
    const {url, method, params, headers, data} = request;

    const urlWithParams = appendParams(
      [
        this.#options.protocol + '://',
        attachPath(this.#options.domain, url),
      ].join(''),
      new URLSearchParams(params),
    );

    const body = typeof data === 'object' ? JSON.stringify(data) : data;

    try {
      const controller = new AbortController();
      setTimeout(
        () => controller.abort(),
        request.timeout || this.#options.timeout,
      );

      this._logRequest({...request, url: urlWithParams, data: body});

      const response = await fetch(urlWithParams, {
        method,
        headers: this.jwtToken
          ? {
              ...headers,
              Authorization: `Bearer ${this.jwtToken}`,
            }
          : headers,
        body,

        signal: controller.signal,
      });

      this._logResponse(
        {
          ...request,

          url: urlWithParams,

          headers: response.headers as any,
          data: response,
        },
        response.status,
      );

      return {response, request};
    } catch (e) {
      if (e?.name === 'AbortError') {
        throw new BadNetworkConnectionError(request, 'Timer triggered');
      } else if (e.message === 'Network request failed') {
        throw new BadNetworkConnectionError(request, e.message);
      }
      throw new RequestError('FetchError', request, e.message);
    }
  }

  _logRequest(requestInfo: RequestInfo) {
    this.#options.logger.log(
      `>> ${requestInfo.method} ${requestInfo.url}, h - ${JSON.stringify(
        requestInfo.headers,
      )}, b - ${JSON.stringify(requestInfo.data)}`,
    );
  }
  _logResponse(requestInfo: RequestInfo, status: number) {
    this.#options.logger.log(
      `<< ${requestInfo.method} [${status}] ${
        requestInfo.url
      }, h - ${JSON.stringify(requestInfo.headers)}, b - ${JSON.stringify(
        requestInfo.data,
      )}`,
    );
  }
}
