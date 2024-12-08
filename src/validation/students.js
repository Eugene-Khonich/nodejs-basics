// src/validation/students.js

import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});

// const validationResult = createStudentSchema.validate(dataToValidate, {
//   abortEarly: false,
// });
// if (validationResult.error) {
//   console.error(validationResult.error.message);
// } else {
//   console.log('Data is valid!');
// }

//-----Custom error message-----
// .messages({
//     'string.base': 'Username should be a string',
//     'string.min': 'Username should have at least {#limit} characters',
//     'string.max': 'Username should have at most {#limit} characters',
//     'any.required': 'Username is required',
//   }),
