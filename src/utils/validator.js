const EMPTY_STRING = '';
const ONE = 1;
const ZERO = 0;

export const checkNull = (property) => {
  return property === null;
};

export const isNullOrEmpty = (property) => {
  return checkNull(property) || property === EMPTY_STRING;
};

export const checkValidArray = (property, allowZero) => {
  if (Array.isArray(property)) {
    if (property.length > ZERO || allowZero) {
      return true;
    }
  }
  return false;
};

export const checkValidObject = (property) => {
  if (!property) {
    property = {};
  }
  return typeof property === 'object' && Object.keys(property).length > ZERO;
};

export const checkIsUrl = (property) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(property);
};

export const checkIfUndefined = (property) => {
  return property === undefined;
};

export function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string?.charAt(ZERO).toUpperCase() + string.slice(ONE)?.toLowerCase();
}
