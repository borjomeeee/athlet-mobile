import {RequestInfo, HttpRequestResult, HttpRequestBaseResult} from './Types';

export class RequestError extends Error {
  message: string;
  requestInfo: RequestInfo;
  constructor(exceptionName: string, requestInfo: RequestInfo, message = '') {
    super();

    this.requestInfo = requestInfo;
    this.message = `[${exceptionName}] ${JSON.stringify(
      requestInfo,
    )}. ${message}`;
  }
}

export class BadNetworkConnectionError extends RequestError {
  constructor(requestInfo: RequestInfo, message: string) {
    super('BadNetworkConnectionError', requestInfo, message);
  }
}

export class ParseJsonError extends RequestError {
  result: HttpRequestBaseResult;
  constructor(result: HttpRequestBaseResult, message = '') {
    super('ParseJsonError', result.request, message);
    this.result = result;
  }
}

export class ParseJWTFromResponseError extends RequestError {
  result: HttpRequestBaseResult;
  constructor(result: HttpRequestBaseResult, message = '') {
    super('ParseJWTFromResponseError', result.request, message);
    this.result = result;
  }
}

export class BadApiResponseError extends RequestError {
  result: HttpRequestResult;
  reason?: string;

  constructor(result: HttpRequestResult, reason?: string) {
    super(
      'BadApiResponseError',
      result.request,
      `[${result.response.status}] Reason: ${reason}`,
    );

    this.result = result;
    this.reason = reason;
  }
}
