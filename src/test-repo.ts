import BookRepository from './repo/books/BookRepository';

(async () => {
  const puppet = await BookRepository.getInstance();
  const props = await puppet.getGenreProps();
  const books = await puppet
      .getCartURL(props[Math.floor(Math.random() * props.length)].link || '');
  console.log(books);
})();
