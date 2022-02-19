import { BookConfig } from "./config/book.config";
import PuppeteerService from "./services/puppeteer/PuppeteerService";

(async() => {
    const puppet = await PuppeteerService.getInstance(BookConfig.BOOK_URL);
    const props = await puppet.getGenreProps();
    const books = await puppet.getCartURL(props[0].link || '');
    console.log(books); 
})(); 