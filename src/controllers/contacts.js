import { ROLES } from '../constants/roles.js';
import {
  createContactService,
  deleteContactService,
  getAllContactsService,
  getOneContactService,
  patchContactService,
  putContactService,
  // uploadContactsPhoto,
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
  if (req.user.role === ROLES.USER) {
    filters.userId = req.user._id;
  } else if (req.user.role === ROLES.ADMIN) {
    delete filters.userId;
  }

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

export const getOneContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const role = req.user.role;

  const contact = await getOneContactService(contactId, userId, role);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const newContact = await createContactService(
    {
      ...req.body,
      userId: req.body.userId ?? req.user._id,
    },
    req.file,
  );

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully!',
    data: newContact,
  });
};

export const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const updated = await patchContactService(
    contactId,
    req.body,
    userId,
    req.file,
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
};

export const putContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const updated = await putContactService(contactId, req.body, userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully put (replaced) a contact!',
    data: updated,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const role = req.user.role;

  await deleteContactService(contactId, userId, role);

  res.status(204).end();
};

// export const uploadContactPhoto = async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await uploadContactsPhoto(contactId, req.file);
//   return res.json({
//     status: 200,
//     message: `Successfully updated contacts photo with id ${contactId}!`,
//     data: contact,
//   });
// };
