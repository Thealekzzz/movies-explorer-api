import { celebrate, Joi } from 'celebrate';

export const patchMeValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

export default patchMeValidation;
