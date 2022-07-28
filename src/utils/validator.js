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

export const checkIfUndefined = (property) => {
  return property === undefined;
};

export function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string?.charAt(ZERO).toUpperCase() + string.slice(ONE)?.toLowerCase();
}

export function validateData(obj) {
  return !Object.values(obj).some((x) => x === null || x === '');
}
