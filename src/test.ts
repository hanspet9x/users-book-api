import { ServerConfig } from "./config/server.config";
import PuppeteerService from "./services/puppeteer/PuppeteerService";

(async() => {
    const puppet = await PuppeteerService.getInstance(ServerConfig.BOOK_URL);
    const props = await puppet.getGenreProps();
    console.log(props);
})(); 