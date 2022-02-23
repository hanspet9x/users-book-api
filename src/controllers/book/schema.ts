import Joi from 'joi';
export const BookRequests = {
  getCartURL: Joi.object({
    genreUrl: Joi.string().uri().required(),
  }),
};
