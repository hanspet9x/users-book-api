import puppeteer from "puppeteer";
import { PuppeteerConfig } from "../../config/puppeteer.config";
import ResponseError from "../../services/response/ResponseError";
import { ICheckoutResponse } from "./interface/checkout.types";
import { IGenreResponse } from "./interface/genre.types";
class BookRepository {
  static service: BookRepository;
  static browser: puppeteer.Browser;
  static url: string;
  static MODAL_TIMEOUT: number = 3000;
  static PAGE_REQUEST_TIMEOUT: number = 0;

  static BOOK_NOT_FOUND: string = "Book not found";
  static PAGE_TIMEOUT_MESSAGE = "Page timeout";

  static async getInstance(url: string){
    BookRepository.url = url;
    if (BookRepository.browser) {
      return this.service;
    }
    try {
      BookRepository.service = new BookRepository();
      BookRepository.browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
      });
      return BookRepository.service;
    } catch (error) {
      throw BookRepository.service.processError(error);
    }
  }

  static resetTimeout() {
    BookRepository.PAGE_REQUEST_TIMEOUT = PuppeteerConfig.PAGE_TIMEOUT
  }

  static increaseTimeoutByRetry(retry: number) {
    BookRepository.PAGE_REQUEST_TIMEOUT = PuppeteerConfig.PAGE_TIMEOUT * retry;
  }

  async getPage(
    url: string,
    waitForselector: string,
    lifecycle?: puppeteer.PuppeteerLifeCycleEvent
  ) {
    try {
      const page = await BookRepository.browser.newPage();
      await page.goto(url, {
        waitUntil: lifecycle || "networkidle2",
        timeout: BookRepository.PAGE_REQUEST_TIMEOUT,
      });
      await page.waitForSelector(waitForselector);
      return page;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async getGenreProps(): Promise<IGenreResponse[]> {
    try {
      const page = await this.getPage(
        BookRepository.url,
        "div.categoryContainer"
      );
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

  async getCartURL(genreURL: string) {
    try {
      const page = await this.getPage(
        genreURL,
        "div.pollContents",
        "domcontentloaded"
      );
      await this.closeSignInModal(page);
      const bookId = await this.getRandomBookId(page);
      await this.gotoAmazon(bookId, page);
      await this.addToCart(page);
      const checkoutURL = this.getCheckOutURL(page);
      return checkoutURL;
    } catch (error) {
      throw this.processError(error);
    }
  }

  private async getRandomBookId(page: puppeteer.Page) {
    try {
      return page.$$eval("div.tooltipTrigger", (books) => {
        // link: book.querySelector("[data-resource-id]"),
        const random = Math.floor(Math.random() * books.length);
        const bookId = (books[random] as HTMLElement).dataset.resourceId;
        return `[data-resource-id="${bookId}"]`;
      });
    } catch (error) {
      throw this.processError(error);
    }
  }

  private async closeSignInModal(page: puppeteer.Page) {
    try {
      await page.waitForTimeout(BookRepository.MODAL_TIMEOUT);
      await page.screenshot({ path: "hover.png" });
      const button = await page.$(".modal__close > button.gr-iconButton");
      if (button) {
        await button.evaluate((node) => (node as HTMLElement).click());
      }
      await page.screenshot({ path: "hover2.png" });
    } catch (error) {
      throw this.processError(error);
    }
  }

  private async gotoAmazonViaHover(randomBookId: string, page: puppeteer.Page) {
    try {
      const toolTipContainer = await page.$(randomBookId);
      await page.waitForTimeout(1000);
      await toolTipContainer?.hover();
      await toolTipContainer?.waitForSelector("section");
      const amazonClickEvent = toolTipContainer?.evaluateHandle((el) => {
        const amazonLink = el?.querySelector(
          "a#buyButton"
        ) as HTMLAnchorElement;
        amazonLink.target = "";
        amazonLink.rel = "";
        return amazonLink.click();
      });
      await Promise.all([page.waitForNavigation(), amazonClickEvent]);
      page.screenshot({ path: "hover4.png" });
    } catch (error) {
      throw this.processError(error);
    }
  }

  private async gotoAmazon(randomBookId: string, page: puppeteer.Page) {
    try {
      //hover to odisplay the amazon tooltip
      await Promise.all([page.waitForNavigation(), page.click(randomBookId)]);
      const amazonLinkEvent = page.evaluate(() => {
        const amazonLink = document.querySelector(
          "a#buyButton"
        ) as HTMLAnchorElement;
        amazonLink.target = "";
        amazonLink.rel = "";
        return amazonLink.click();
      });

      await Promise.all([page.waitForNavigation(), amazonLinkEvent]);
      page.screenshot({ path: "hover4.png" });
    } catch (error) {
      throw new ResponseError(BookRepository.BOOK_NOT_FOUND, ResponseError.NOT_FOUND)
    }
  }

  private async addToCart(page: puppeteer.Page) {
    const cartEvent = page.evaluate(() => {
      const button = document.querySelector(
        "input#add-to-cart-button"
      ) as HTMLInputElement;
      return button.click();
    });
    await Promise.all([page.waitForNavigation(), cartEvent]);
    page.screenshot({ path: "hover5.png" });
  }

  private async getCheckOutURL(
    page: puppeteer.Page
  ): Promise<ICheckoutResponse> {
    const checkoutEvent = page.evaluate(() => {
      const button = document.querySelector(
        'input[name="proceedToRetailCheckout"]'
      ) as HTMLInputElement;
      return button.click();
    });
    await Promise.all([page.waitForNavigation(), checkoutEvent]);
    page.screenshot({ path: "hover6.png" });
    return { chkoutURL: page.url() };
  }

  private processError(error: Error | any) {
    if (error instanceof puppeteer.errors.TimeoutError) {
      return new ResponseError(BookRepository.PAGE_TIMEOUT_MESSAGE, ResponseError.REQUEST_TIMEOUT);
    }
    return new ResponseError(error.message, ResponseError.UNPROCESSABLE);
  }
}

export default BookRepository;
