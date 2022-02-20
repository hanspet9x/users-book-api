import { IServiceResponse } from "../../interface/service.type";
import BookRepository from "../../repo/books/BookRepository";
import { IGenreResponse } from "../../repo/books/interface/genre.types";
import ResponseError from "../response/ResponseError";

export default class BookService {
  static BOOK_URL = "https://www.goodreads.com/choiceawards/best-books-2020";

  static async getGenre(): Promise<IServiceResponse<IGenreResponse[]>> {
    try {
      const genre = await (
        await BookRepository.getInstance(BookService.BOOK_URL)
      ).getGenreProps();
      return { hasError: false, response: genre };
    } catch (error) {
      return { hasError: true, response: error as ResponseError };
    }
  }
}
