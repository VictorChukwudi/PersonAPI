const Joi = require("joi");

const personValidate = Joi.object({
  name: Joi.string(),
});

module.exports = personValidate;
