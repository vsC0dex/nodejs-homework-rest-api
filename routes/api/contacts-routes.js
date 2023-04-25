const express = require("express");

const ctrl = require("../../controllers/contacts-controller");

const { isValidId, authenticate } = require("../../middlewares");

const validateBody = require("../../utils/validateBody");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listAllContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
