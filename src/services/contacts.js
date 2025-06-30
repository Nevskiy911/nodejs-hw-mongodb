import { Contact } from '../db/models/contact.js';
import createHttpError from 'http-errors';
import { createPaginationMetadata } from '../utils/create-pagination-metadata.js';
import { ROLES } from '../constants/roles.js';

export const getAllContactsService = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filters,
}) => {
  const offset = (page - 1) * perPage;
  const contactFilters = Contact.find();

  if (filters.contactType) {
    contactFilters.where('contactType').equals(filters.contactType);
  }

  if (typeof filters.isFavourite === 'boolean') {
    contactFilters.where('isFavourite').equals(filters.isFavourite);
  }

  if (filters.userId) {
    contactFilters.where('userId').equals(filters.userId);
  }

  const [contacts, contactCount] = await Promise.all([
    Contact.find()
      .merge(contactFilters)
      .skip(offset)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      }),
    Contact.find().merge(contactFilters).countDocuments(),
  ]);
  const metadata = createPaginationMetadata(page, perPage, contactCount);

  return { contacts, ...metadata };
};

export const getOneContactService = async (contactId, userId, role) => {
  const query = { _id: contactId };

  if (role === ROLES.USER) {
    query.userId = userId;
  }

  const contact = await Contact.findOne(query);

  if (!contact) {
    throw createHttpError(404, `Contact ${contactId} not found`);
  }

  return contact;
};

export const createContactService = async (data) => {
  return Contact.create(data);
};

export const patchContactService = async (contactId, data, userId) => {
  const updated = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    data,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }

  return updated;
};

export const putContactService = async (contactId, data, userId) => {
  const updated = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { ...data, userId },
    {
      new: true,
      overwrite: true,
      runValidators: true,
    },
  );
  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }
  return updated;
};

export const deleteContactService = async (contactId, userId, role) => {
  const query = { _id: contactId };

  if (role === ROLES.USER) {
    query.userId = userId;
  }

  const deleted = await Contact.findOneAndDelete(query);
  if (!deleted) {
    throw createHttpError(404, 'Contact not found');
  }
};
