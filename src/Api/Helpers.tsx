import {
  RequestErrorWithBadStatus,
  ParseJsonError,
  BadApiResponseError,
} from './Exceptions';
import {HttpRequestBaseResult, HttpRequestResult} from './Types';

export const parseJson = async (
  result: HttpRequestBaseResult,
): Promise<HttpRequestResult> => {
  try {
    return {
      ...result,
      json: await result.response.json(),
    };
  } catch (e) {
    throw new ParseJsonError(result, e.message);
  }
};

export const parseJsonIfOk = async (
  result: HttpRequestBaseResult,
): Promise<HttpRequestResult> => {
  const {response} = result;
  if (response.ok) {
    return await parseJson(result);
  }

  throw new RequestErrorWithBadStatus(result, 200);
};

export const parseDefaultApiResponse = (
  result: HttpRequestBaseResult,
): Promise<HttpRequestResult> => {
  return parseJson(result)
    .then(resultWithJson => {
      const {json} = resultWithJson;

      if (!json.isOk) {
        throw new BadApiResponseError(resultWithJson, json.reason);
      }

      if (!json.data) {
        throw new BadApiResponseError(resultWithJson);
      }

      return {...resultWithJson, json: resultWithJson.json.data};
    })
    .catch(e => {
      if (e instanceof BadApiResponseError) {
        throw e;
      }

      throw new BadApiResponseError({...result, json: {}}, e.message);
    });
};
