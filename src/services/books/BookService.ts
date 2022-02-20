import { IServiceResponse } from "../../interface/service.type";
import BookRepository from "../../repo/books/BookRepository";
import { ICheckoutResponse } from "../../repo/books/interface/checkout.types";
import { IGenreResponse } from "../../repo/books/interface/genre.types";
import ResponseError from "../response/ResponseError";

export default class BookService {

  static async getGenre(): Promise<IServiceResponse<IGenreResponse[]>> {
    try {
      const genre = await (
        await BookRepository.getInstance()
      ).getGenreProps();
      return { hasError: false, response: genre };
    } catch (error) {
      return { hasError: true, response: error as ResponseError };
    }
  }

  static async increaseTimeoutAndgetGenre(retry: number){
    BookRepository.increaseTimeoutByRetry(retry);
    return BookService.getGenre();
  }

  static async getCartURL(
    genreUrl: string
  ): Promise<IServiceResponse<ICheckoutResponse>> {
    try {
      const checkoutURL = await (
        await BookRepository.getInstance()
      ).getCartURL(genreUrl);
      return { hasError: false, response: checkoutURL };
    } catch (error) {
      return { hasError: true, response: error as ResponseError };
    }
  }

  static async increaseTimeoutAndgetCartURL(retry:number, genreUrl: string){
    BookRepository.increaseTimeoutByRetry(retry);
    return BookService.getCartURL(genreUrl);
  }

  
}
