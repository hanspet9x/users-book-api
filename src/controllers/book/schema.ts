import Joi from 'joi';
export const BookRequests = {
  getCartURL: Joi.object({
    genreUrl: Joi.string().uri().required(),
  }),
  getCartURLRetry: Joi.object({
    genreUrl: Joi.link().required(),
    retry: Joi.number().required(),
  }),
  genreRetry: Joi.object({
    retry: Joi.number().required(),
  }),
};
