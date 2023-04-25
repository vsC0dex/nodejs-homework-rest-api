const { ctrlWrapper } = require("../utils");

const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const listAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }
  res.json({
    message: `Contact with id:${id} deleted`,
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }
  res.json(result);
};

module.exports = {
  listAllContacts: ctrlWrapper(listAllContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
