const express = require("express");

const ctrl = require("../../controllers/contacts-controller");

const validateBody = require("../../utils/validateBody");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
