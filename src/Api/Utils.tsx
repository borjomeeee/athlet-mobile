export const appendParams = (
  url: string,
  params: URLSearchParams | undefined,
) => {
  if (!params) {
    return url;
  }
  return [url, params].join('?');
};

export const attachPath = (baseUrl: string, path: string) => {
  return baseUrl + path;
};

export const parseSearchParams = (
  params: Record<string, string>,
): URLSearchParams | undefined => {
  return Object.keys(params).length > 0
    ? new URLSearchParams(params)
    : undefined;
};

export const getBaseUrl = (
  domen: string,
  protocol: string = 'https',
  version?: string,
) => {
  let url = `${protocol}://${domen}`;
  if (version) {
    url += `/v${version}`;
  }

  return url;
};
