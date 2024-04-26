import Joi from "joi";

import {
  ILoginPayload,
  IRegisterPayload,
} from "../interfaces/auth.interfaces";


export const registerSchemaValidator = (data: IRegisterPayload) => {
    const schema = Joi.object({
      user: Joi.object({
        name: Joi.string().required().max(23),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
      }).required(),
    });
    return schema.validate(data);
};

export const loginSchemaValidator = (data: ILoginPayload) => {
  const schema = Joi.object({
    credentials: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }).required(),
  });
  return schema.validate(data);
};