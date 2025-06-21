import { Contact } from '../db/models/contact.js';

export const getContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;

  const skip = (page - 1) * perPage;

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sortObj = { [sortBy]: sortDirection };

  const filter = {};
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  const [totalItems, contacts] = await Promise.all([
    Contact.countDocuments(filter),
    Contact.find(filter).sort(sortObj).skip(skip).limit(Number(perPage)),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};
