const express = require("express");
const router = express.Router();
const { validateContactsCreate, validateContactsUpdate, validateFavoriteUpdate } = require("./validate");
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateContactsCreate, ctrl.add);

router.delete("/:contactId", ctrl.del);

router.put("/:contactId", validateContactsUpdate, ctrl.updateContact);

router.patch("/:contactId/favorite", validateFavoriteUpdate, ctrl.updateFavorite);

module.exports = router;
