export type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'UPDATE';

export interface RequestInfo {
  url: string;
  method: RequestMethod;

  data?: object | string;

  headers?: Record<string, string>;
  params?: Record<string, string>;

  timeout?: number;
}

export type HttpRequestCall = (requestInfo: RequestInfo) => Promise<any>;

export interface HttpRequestBaseResult {
  response: Response;
  request: RequestInfo;
}
export interface HttpRequestResult extends HttpRequestBaseResult {
  json: Record<string, any>;
}

export type HttpDefinedRequestCall = (
  requestInfo: Omit<RequestInfo, 'method'>,
) => Promise<HttpRequestBaseResult>;

export interface IHttpClient {
  get: HttpDefinedRequestCall;
  post: HttpDefinedRequestCall;
  update: HttpDefinedRequestCall;
  delete: HttpDefinedRequestCall;
}

export interface IHttpClientConfig {
  logger: {log: (message: string) => void};

  protocol: string;
  domain: string;

  timeout: number;
}
