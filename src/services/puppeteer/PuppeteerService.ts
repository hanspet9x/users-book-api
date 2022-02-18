import puppeteer from "puppeteer";
import { PuppeteerConfig } from "../../config/puppeteer.config";
import ResponseError from "../response/ResponseError";
class PuppeteerService {
  static service: PuppeteerService;
  static browser: puppeteer.Browser;
  static url: string;

  static async getInstance(url: string) {
    PuppeteerService.url = url;
    if (PuppeteerService.browser) {
      return this.service;
    }
    try {
      PuppeteerService.service = new PuppeteerService();
      PuppeteerService.browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
      });
      return PuppeteerService.service;
    } catch (error) {
      throw PuppeteerService.service.processError(error);
    }
  }

  async getPage(waitForselector: string) {
    try {
      const page = await PuppeteerService.browser.newPage();
      await page.goto(PuppeteerService.url, {
        waitUntil: "networkidle2",
        timeout: PuppeteerConfig.PAGE_TIMEOUT,
      });
      await page.waitForSelector(waitForselector);
      return page;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async getGenreProps() {
    try {
      const page = await this.getPage("div.categoryContainer");
      return page.$$eval("div.category", (categories) => {
        return categories.map((category, index) => ({
          link: category.querySelector("a")?.href,
          name: category.querySelector(".category__copy")?.textContent?.trim(),
          imgURL: (
            category.querySelector(".category__winnerImage") as HTMLImageElement
          ).src,
          index,
        }));
      });
    } catch (error) {
      throw this.processError(error);
    }
  }

  private processError(error: Error | any) {
    if (error instanceof puppeteer.TimeoutError) {
      return new ResponseError(PuppeteerConfig.PAGE_TIMEOUT_SIGNAL, 408);
    }
    return new ResponseError(error.message, 417);
  }
}

export default PuppeteerService;
