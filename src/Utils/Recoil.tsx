export const getKeyFabricForDomain = (domain: string) => (key: string) =>
  `[${domain}] ${key}`;
