import Joi from 'joi';

export const userSchema  = Joi.object({
    userId: Joi.number().required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    estimatedSalary: Joi.number().required(),
    purchased: Joi.number().required()
})