import Joi  from 'joi';
export const BookRequests = {
    getCartURL: Joi.object({
        genreURL: Joi.link().required()
    }),
    getCartURLRetry: Joi.object({
        genreURL: Joi.link().required(),
        retry: Joi.number().required()
    }),
    genreRetry: Joi.object({
        retry: Joi.number().required()
    }),
}