import { celebrate, Joi } from 'celebrate';

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .min(2)
      .max(30),
    password: Joi.string().required(),
  }),
});

export const registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
