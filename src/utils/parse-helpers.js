import { CONTACT_TYPE } from '../constants/contactType.js';

export const parseNumber = (value, defaultValue) => {
  const parsed = Number.parseInt(value);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return defaultValue;
  }
  return parsed;
};

export const parseBoolean = (value) => {
  if (['true', 'false'].includes(value)) return JSON.parse(value);
};

export const parseType = (value) => {
  if (Object.values(CONTACT_TYPE).includes(value)) return value;
};

export const parseSortOrder = (value) => {
  if (['asc', 'desc'].includes(value)) {
    return value;
  }

  return 'asc';
};

export const parseSortBy = (value) => {
  if (['name', 'phoneNumber', 'contactType'].includes(value)) {
    return value;
  }

  return '_id';
};

export const parseSortParams = (obj) => {
  return {
    sortOrder: parseSortOrder(obj.sortOrder),
    sortBy: parseSortBy(obj.sortBy),
  };
};

export const parseFilters = (obj) => {
  return {
    isFavourite: parseBoolean(obj.isFavourite),
    contactType: parseType(obj.contactType),
  };
};

export const parsePaginationParams = (obj) => {
  return {
    page: parseNumber(obj.page, 1),
    perPage: parseNumber(obj.perPage, 3),
  };
};
