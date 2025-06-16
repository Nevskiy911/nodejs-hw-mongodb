import mongoose from 'mongoose';
import { Contact } from '../db/models/contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, `Contact ${contactId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact created successfully!',
    data: newContact,
  });
};

export const patchContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const updated = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
};

export const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log('PUT contactId:', contactId);
  console.log('Request body:', req.body);

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const { name, phoneNumber, contactType } = req.body;
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(400, 'Missing required fields for PUT');
  }

  const updated = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    overwrite: true,
    runValidators: true,
  });

  if (!updated) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully put (replaced) a contact!',
    data: updated,
  });
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Invalid contact ID');
  }

  const deleted = await Contact.findByIdAndDelete(contactId);
  if (!deleted) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).end();
};
