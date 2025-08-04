import Joi from "joi";


export const createContactSchema = Joi.object({
 name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9\s\-()]{10,20}$/)
    .min(3)
    .max(20)
    .required(),
   email: Joi.string().email().min(3).max(20),
   contactType: Joi.string().valid("work","home","personal").required().default("personal"),





});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9\s\-()]{10,20}$/)
    .min(3)
    .max(20),
  email: Joi.string().email().min(3).max(20),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});