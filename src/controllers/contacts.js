import {
  createContactService,
  deleteContactService,
  getAllContactsService,
  getContactByIdService,
  patchContactService,
  putContactService,
} from '../services/contacts.js';
import {
  parseFilters,
  parsePaginationParams,
  parseSortParams,
} from '../utils/parse-helpers.js';

export const getAllContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filters = parseFilters(req.query);
  const contacts = await getAllContactsService({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactByIdService(contactId);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const newContact = await createContactService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully!',
    data: newContact,
  });
};

export const patchContact = async (req, res) => {
  const { contactId } = req.params;

  const updated = await patchContactService(contactId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
};

export const putContact = async (req, res) => {
  const { contactId } = req.params;
  const updated = await putContactService(contactId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully put (replaced) a contact!',
    data: updated,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  await deleteContactService(contactId);

  res.status(204).end();
};
