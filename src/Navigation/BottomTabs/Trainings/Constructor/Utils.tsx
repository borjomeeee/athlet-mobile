const setHeaderPrefix = 'set-header-';
const setFooterPrefix = 'set-footer-';

export function isSetHeader(elementId: string) {
  return elementId.startsWith(setHeaderPrefix);
}

export function parseSetHeaderId(elementId: string) {
  return elementId.replace(setHeaderPrefix, '');
}

export function isSetFooter(elementId: string) {
  return elementId.startsWith(setFooterPrefix);
}

export function parseSetFooterId(elementId: string) {
  return elementId.replace(setFooterPrefix, '');
}

export function getSetHeaderId(elementId: string) {
  return setHeaderPrefix + elementId;
}

export function getSetFooterId(elementId: string) {
  return setFooterPrefix + elementId;
}
