import {IServiceResponse} from '../../interface/service.type';
import BookRepository from '../../repo/books/BookRepository';
import {ICartResponse} from '../../repo/books/interface/cart.types';
import {IGenreResponse} from '../../repo/books/interface/genre.types';
import {LoggerService} from '../log/LoggerService';
import ResponseError from '../response/ResponseError';

export default class BookService {
  static async getGenre(): Promise<IServiceResponse<IGenreResponse[]>> {
    try {
      const genre = await (
        await BookRepository.getInstance()
      ).getGenreProps();
      return {hasError: false, response: genre};
    } catch (error) {
      LoggerService.error(error);
      return {hasError: true, response: error as ResponseError};
    }
  }

  static async increaseTimeoutAndgetGenre() {
    BookRepository.increaseTimeoutByRetry();
    return BookService.getGenre();
  }

  static async getCartURL(
      genreUrl: string,
  ): Promise<IServiceResponse<ICartResponse>> {
    try {
      const checkoutURL = await (
        await BookRepository.getInstance()
      ).getCartURL(genreUrl);
      return {hasError: false, response: checkoutURL};
    } catch (error) {
      LoggerService.error(error);
      return {hasError: true, response: error as ResponseError};
    }
  }

  static async increaseTimeoutAndgetCartURL(genreUrl: string) {
    BookRepository.increaseTimeoutByRetry();
    return BookService.getCartURL(genreUrl);
  }
}
