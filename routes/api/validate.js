const Joi = require("joi");

const schemaCreateContacts = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail", "ru", "io"] } })
    .required(),
  phone: Joi.string().min(10).max(14).required(),
});

const schemaUpdateContacts = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail", "ru", "io"] } })
    .optional(),
  phone: Joi.string().min(10).max(14).optional(),
}).or("name", "email", "phone");

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail", "ru", "io"] } })
    .required(),
  password: Joi.string().min(6).required(),
});

const shemaUserRepeatVerify = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail", "ru", "io"] } })
    .required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    next({
      status: "error",
      code: 400,
      message: `Field: ${error.message.replace(/"/g, "")}`,
    });
  }
};

module.exports = {
  validateContactsCreate: (req, res, next) => {
    return validate(schemaCreateContacts, req.body, next);
  },

  validateContactsUpdate: (req, res, next) => {
    return validate(schemaUpdateContacts, req.body, next);
  },

  validateFavoriteUpdate: (req, res, next) => {
    return validate(schemaUpdateFavorite, req.body, next);
  },

  validateUser: (req, res, next) => {
    return validate(schemaUser, req.body, next);
  },

  validateRepeatVerify: (req, res, next) => {
    return validate(shemaUserRepeatVerify, req.body, next);
  },
};
