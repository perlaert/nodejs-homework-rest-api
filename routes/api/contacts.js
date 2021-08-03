const express = require("express");
const router = express.Router();
const { validateContactsCreate, validateContactsUpdate, validateFavoriteUpdate } = require("./validate");
const { getAll, getById, add, del, updateContact, updateFavorite } = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateContactsCreate, add);

router.delete("/:contactId", del);

router.put("/:contactId", validateContactsUpdate, updateContact);

router.patch("/:contactId/favorite", validateFavoriteUpdate, updateFavorite);

module.exports = router;
