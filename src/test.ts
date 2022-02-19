import { BookConfig } from "./config/book.config";
import BookPuppeteerService from "./services/book.puppeteer/BookPuppeteerService";

(async() => {
    const puppet = await BookPuppeteerService.getInstance(BookConfig.BOOK_URL);
    const props = await puppet.getGenreProps();
    const books = await puppet.getCartURL(props[0].link || '');
    console.log(books); 
})(); 