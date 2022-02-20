
import { NextFunction, Response, Request } from "express";
import Joi from "joi";
export const MValidateQueryRequest =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const {error, value} = schema.validate(req.query);
    if(error) {
        next(error.details[0].message);
        return;
    }
    req.body = req.query;
    next();
    return;
  };