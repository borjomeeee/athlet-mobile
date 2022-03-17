import {RequestInfo, HttpRequestResult, HttpRequestBaseResult} from './Types';

export class RequestError extends Error {
  message: string;
  requestInfo: RequestInfo;
  constructor(
    exceptionName: string,
    requestInfo: RequestInfo,
    message: string = '',
  ) {
    super();

    this.requestInfo = requestInfo;
    this.message = `[${exceptionName}] \n${JSON.stringify(
      requestInfo,
      null,
      2,
    )}. ${message}`;
  }
}

export class BadNetworkConnectionError extends RequestError {
  constructor(requestInfo: RequestInfo, message: string) {
    super('BadNetworkConnectionError', requestInfo, message);
  }
}

export class RequestErrorWithBadStatus extends RequestError {
  result: HttpRequestBaseResult;

  constructor(result: HttpRequestBaseResult, expectedStatus: number) {
    super(
      'BadResponseError',
      result.request,
      `Expected: ${expectedStatus}, but get ${result.response.status}`,
    );

    this.result = result;
  }
}

export class ParseJsonError extends RequestError {
  result: HttpRequestBaseResult;
  constructor(result: HttpRequestBaseResult, message: string = '') {
    super('ParseJsonError', result.request, message);
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
