import { celebrate, Joi } from 'celebrate';
import { urlPattern } from '../../consts/regexs.js';

const registerValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlPattern).required(),
  }),

});

export default registerValidation;
