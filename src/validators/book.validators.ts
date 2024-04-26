import Joi from "joi";

import { IAddBook } from "../interfaces/book.interfaces";

export const bookSchemaValidator = (data: IAddBook) => {
    const schema = Joi.object({
      book: Joi.object({
        title: Joi.string().required().max(23),
        author: Joi.string().email().required(),
        publication_year: Joi.number().required()
      }).required(),
    });
    return schema.validate(data);
};
