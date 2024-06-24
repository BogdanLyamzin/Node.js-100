import Joi from "joi";

import { typeList, releaseYearRegexp } from "../constants/movies-constants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "title must be"
    }),
    director: Joi.string().required(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
});

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.string().pattern(releaseYearRegexp),
});
