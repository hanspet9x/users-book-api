import express, {Request, Response} from 'express';
import {MValidateQueryRequest} from '../../middleware/schemaValidation.midw';
import BookService from '../../services/books/BookService';
import ResponseError from '../../services/response/ResponseError';
import {ResponseService} from '../../services/response/ResponseService';
import {BookRoutes} from './routes';
import {BookRequests} from './schema';

const BookController = express.Router();

BookController.get(
    BookRoutes.GENRE,
    async (request: Request, response: Response) => {
      const result = await BookService.getGenre();
      processResponse(response, result);
    },
);


BookController.get(
    BookRoutes.GENRE_RETRY,
    async (request: Request, response: Response) => {
      const result = await BookService.increaseTimeoutAndgetGenre();
      processResponse(response, result);
    },
);

BookController.get(
    BookRoutes.CHECK_OUT,
    MValidateQueryRequest(BookRequests.getCartURL),
    async (request: Request, response: Response) => {
      const {genreUrl} = request.body;
      const result = await BookService.getCartURL(genreUrl as string);
      processResponse(response, result);
    },
);

BookController.get(
    BookRoutes.CHECK_OUT_RETRY,
    MValidateQueryRequest(BookRequests.getCartURL),
    async (request: Request, response: Response) => {
      const {genreUrl} = request.body;
      const result = await BookService.increaseTimeoutAndgetCartURL(
      genreUrl as string,
      );
      processResponse(response, result);
    },
);

const processResponse = (response: Response, result: any) => {
  if (!result.hasError) {
    ResponseService.send200(response, result.response);
    return;
  }
  ResponseService.sendError(response, result.response as ResponseError);
};

export default BookController;
