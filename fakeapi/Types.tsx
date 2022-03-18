export enum SubmitFormResponse {
  INVALID_EMAIL = 'invalid-email',
  INVALID_PASSWORD = 'invalid-password',
  INVALID_NICKNAME = 'invalid-nickname',
}

export enum DefaultResponse {
  SUCCESS = 'success',
  AUTH_ERROR = 'not-authorized',
  FATAL = 'fatal',
}

export enum SignInResponse {
  INCORRECT_DATA = 'incorrect-data',
}

export enum SignUpResponse {
  NICKNAME_IS_BUSY = 'nickname-is-busy',
  EMAIL_IS_BUSY = 'email-is-busy',
}

export enum CheckNicknameRespons {
  NICKNAME_IS_BUSY = 'nickname-is-busy',
}

export interface IFakeApiConfig {
  responses: Partial<IFakeApiResponses>;
}

export interface IFakeApiResponses {
  signIn: DefaultResponse | SubmitFormResponse | SignInResponse;
  signUp: DefaultResponse | SubmitFormResponse | SignUpResponse;
  checkNickname: DefaultResponse | CheckNicknameRespons;
}
