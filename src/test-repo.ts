import {BookConfig} from './config/book.config';
import BookRepository from './repo/books/BookRepository';

(async () => {
  const puppet = await BookRepository.getInstance();
  const props = await puppet.getGenreProps();
  const books = await puppet.getCartURL(props[0].link || '');
  console.log(books);
})();
