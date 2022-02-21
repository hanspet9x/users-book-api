
import {NextFunction, Response, Request} from 'express';
import Joi from 'joi';
import ResponseError from '../services/response/ResponseError';
import {ResponseService} from '../services/response/ResponseService';
export const MValidateQueryRequest =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req.query);
    if (error) {
      ResponseService.sendError(res,
          new ResponseError(error.details[0].message, 400));
      return;
    }
    req.body = req.query;
    next();
    return;
  };
