import { Contact } from '../db/models/contact.js';
import createHttpError from 'http-errors';
import { createPaginationMetadata } from '../utils/create-pagination-metadata.js';

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

export const getContactByIdService = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact ${contactId} not found`);
  }

  return contact;
};

export const createContactService = async (data) => {
  return Contact.create(data);
};

export const patchContactService = async (contactId, data) => {
  const updated = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }

  return updated;
};

export const putContactService = async (id, data) => {
  const updated = await Contact.findByIdAndUpdate(id, data, {
    new: true,
    overwrite: true,
    runValidators: true,
  });
  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }
  return updated;
};

export const deleteContactService = async (id) => {
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) {
    throw createHttpError(404, 'Contact not found');
  }
};
