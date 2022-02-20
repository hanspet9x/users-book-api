import {Response} from 'express';
import ResponseError from './ResponseError';

const responseFormat = (error: boolean, data: any, message: string) => ({
  error, data, message, statusText: error ? 'failed' : 'success',
});

export const ResponseService = {
  sendError(response: Response, error: ResponseError) {
    response.status(error.status).json(responseFormat(true, null, error.message));
  },
  
  sendData(response: Response, data: any, status: number) {
    response.status(status).json(responseFormat(false, data, ''));
  },
  
  send200(response: Response, data: any) {
    response.status(200).json(responseFormat(false, data, ''));
  },


};
