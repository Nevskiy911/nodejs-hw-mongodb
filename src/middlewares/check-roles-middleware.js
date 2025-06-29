import createHttpError from 'http-errors';
import { ROLES } from '../constants/roles.js';
import { Contact } from '../db/models/contact.js';

export const checkRoles = async (req, res, next) => {
  if (req.user.role === ROLES.MODER) {
    return next();
  }

  if (req.user.role === ROLES.USER) {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

    if (!contact || !contact?.userId?.equals(req.user._id)) {
      throw createHttpError(403, "It's not your contact");
    }

    return next();
  }

  throw createHttpError(
    500,
    `Can't handle role ${req.user.role} for checkRoles`,
  );
};
