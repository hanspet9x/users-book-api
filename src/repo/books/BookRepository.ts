import puppeteer from 'puppeteer';
import {PuppeteerConfig} from '../../config/puppeteer.config';
import CacheService from '../../services/cache/CacheService';
import {LoggerService} from '../../services/log/LoggerService';
import ResponseError from '../../services/response/ResponseError';
import {ICartResponse} from './interface/cart.types';
import {ICheckoutResponse} from './interface/checkout.types';
import {IGenreResponse} from './interface/genre.types';
class BookRepository {
  static service: BookRepository;
  static browser: puppeteer.Browser;
  static MODAL_TIMEOUT = 3000;
  static PAGE_REQUEST_TIMEOUT = 0;

  static BOOK_NOT_FOUND = 'Book not found';
  static PAGE_TIMEOUT_MESSAGE = 'Page timeout';

  static BOOK_URL = 'https://www.goodreads.com/choiceawards/best-books-2020';

  static GENRE_PAGE = 'div.categoryContainer';
  static GENRE_CATEGORY = 'div.category';
  static GENRE_NAME = '.category__copy';
  static GENRE_IMAGE = '.category__winnerImage';
  static GENRE_LINK = 'a';
  static BOOKS_PAGE = 'div.pollContents';
  static BOOK_CONTAINER = 'div.tooltipTrigger';
  static PAGE_MODAL_CLOSE_BUTTON = '.modal__close > button.gr-iconButton';

  static AMAZON_ADD_TO_CART = 'input#add-to-cart-button';
  static AMAZON_GOTO_CHECKOUT = 'input[name="proceedToCheckout"]';
  static GOTO_AMAZON = 'a#buyButton';
  static BOOK_RANDOM_ID_PREFIX = 'data-resource-id';

  static async getInstance() {
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

  test() {
    return BookRepository.AMAZON_ADD_TO_CART;
  }
  static resetTimeout() {
    BookRepository.PAGE_REQUEST_TIMEOUT = PuppeteerConfig.PAGE_TIMEOUT;
  }

  static increaseTimeoutByRetry() {
    BookRepository.PAGE_REQUEST_TIMEOUT =
    PuppeteerConfig.PAGE_TIMEOUT * PuppeteerConfig.PAGE_TIMEOUT_RETRY_MULTIPLE;
  }

  static async closeBrowser() {
    await BookRepository.browser.close();
  }

  async getPage(
      url: string,
      waitForselector: string,
      lifecycle?: puppeteer.PuppeteerLifeCycleEvent,
  ) {
    try {
      const page = await BookRepository.browser.newPage();
      await page.setViewport({
        width: 2000,
        height: 700,
        isLandscape: true,
        deviceScaleFactor: 1,
      });
      await page.goto(url, {
        waitUntil: lifecycle || 'networkidle2',
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
          BookRepository.BOOK_URL,
          BookRepository.GENRE_PAGE,
      );
      return page.$$eval(
          BookRepository.GENRE_CATEGORY,
          (categories, LINK, NAME, IMAGE) => {
            return categories.map((category, index) => ({
              link: (
              category.querySelector(
                LINK as string,
              ) as HTMLHyperlinkElementUtils | null
              )?.href,
              name: category.querySelector(NAME as string)?.textContent?.trim(),
              imgURL: (
              category.querySelector(IMAGE as string) as HTMLImageElement
              ).src,
              index,
            }));
          },
          BookRepository.GENRE_LINK,
          BookRepository.GENRE_NAME,
          BookRepository.GENRE_IMAGE,
      );
    } catch (error) {
      throw this.processError(error);
    }
  }

  async getCartURL(genreURL: string) {
    try {
      const page = await this.getSelectedGenrePage(genreURL);
      await this.closeSignInModal(page);
      const bookId = await this.getRandomBookId(page);
      await this.getSelectedBookPage(bookId, page);
      await this.gotoAmazon(page);
      return await this.addToCart(page);
      // const checkoutURL = this.getCheckOutURL(page);
      // return checkoutURL;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async getSelectedGenrePage(genreURL: string) {
    return await this.getPage(
        genreURL,
        BookRepository.BOOKS_PAGE,
        'domcontentloaded',
    );
  }

  async closeSignInModal(page: puppeteer.Page) {
    try {
      await page.waitForTimeout(BookRepository.MODAL_TIMEOUT);
      // await page.screenshot({path: 'hover.png'});
      const button = await page.$(BookRepository.PAGE_MODAL_CLOSE_BUTTON);
      if (button) {
        await button.evaluate((node) => (node as HTMLElement).click());
        // await page.screenshot({path: 'hover2.png'});
        return true;
      }
      // await page.screenshot({path: 'hover2b.png'});
      return false;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async getRandomBookId(page: puppeteer.Page) {
    try {
      return page.$$eval(
          BookRepository.BOOK_CONTAINER,
          (books, BOOK_RANDOM_ID_PREFIX) => {
          // link: book.querySelector("[data-resource-id]"),
            const random = Math.floor(Math.random() * books.length);
            const bookId = (books[random] as HTMLElement).dataset.resourceId;
            return `[${BOOK_RANDOM_ID_PREFIX}="${bookId}"]`;
          },
          BookRepository.BOOK_RANDOM_ID_PREFIX,
      );
    } catch (error) {
      throw this.processError(error);
    }
  }

  private async gotoAmazonViaHover(randomBookId: string, page: puppeteer.Page) {
    try {
      const toolTipContainer = await page.$(randomBookId);
      await page.waitForTimeout(1000);
      await toolTipContainer?.hover();
      await toolTipContainer?.waitForSelector('section');
      const amazonClickEvent = toolTipContainer?.evaluateHandle((el) => {
        const amazonLink = el?.querySelector(
            'a#buyButton',
        ) as HTMLAnchorElement;
        amazonLink.target = '';
        amazonLink.rel = '';
        return amazonLink.click();
      });
      await Promise.all([page.waitForNavigation(), amazonClickEvent]);
      // page.screenshot({path: 'hover4.png'});
    } catch (error) {
      throw this.processError(error);
    }
  }

  async getSelectedBookPage(randomBookId: string, page: puppeteer.Page) {
    LoggerService.info('Selected Book Page', randomBookId);
    const bookURL = CacheService.get('BOOK_URL');
    if (bookURL) return {cartURL: bookURL};
    try {
      await Promise.all([page.waitForNavigation(), page.click(randomBookId)]);
      LoggerService.info('navigated');
      await page.waitForSelector(BookRepository.GOTO_AMAZON);
      // page.screenshot({path: '1 click to go amazon.png'});
    } catch (error) {
      throw this.processError(error);
    }
  }
  async gotoAmazon(page: puppeteer.Page) {
    LoggerService.info('GotoAmazon');
    try {
      // hover to odisplay the amazon tooltip

      const amazonLinkEvent = page.evaluate((GOTO_AMAZON) => {
        const amazonLink = document.querySelector(
            GOTO_AMAZON,
        ) as HTMLAnchorElement;
        amazonLink.target = '';
        amazonLink.rel = '';
        return amazonLink.click();
      }, BookRepository.GOTO_AMAZON);

      await Promise.all([page.waitForNavigation(), amazonLinkEvent]);
      await page.waitForSelector(BookRepository.AMAZON_ADD_TO_CART);
      // page.screenshot({path: '2 amazon page.png'});
      return true;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async addToCart(page: puppeteer.Page):Promise<ICartResponse> {
    LoggerService.info('GotoCart', page.url());
    try {
      const cartEvent = page.evaluate((AMAZON_ADD_TO_CART) => {
        const button = document.querySelector(
            AMAZON_ADD_TO_CART,
        ) as HTMLInputElement;
        return button.click();
      }, BookRepository.AMAZON_ADD_TO_CART);

      await Promise.all([page.waitForNavigation(), cartEvent]);
      await page.waitForSelector(BookRepository.AMAZON_GOTO_CHECKOUT);
      // page.screenshot({path: '3 added-to-cart.png'});
      CacheService.set('BOOK_URL', page.url());
      return {cartURL: page.url()};
    } catch (error) {
      throw new ResponseError(
          BookRepository.BOOK_NOT_FOUND,
          ResponseError.NOT_FOUND,
      );
    }
  }

  async getCheckOutURL(page: puppeteer.Page): Promise<ICheckoutResponse> {
    LoggerService.info('Initiate checkout', page.url());
    const cartURL = page.url();
    const checkoutEvent = page.evaluate((AMAZON_GOTO_CHECKOUT) => {
      const button = document.querySelector(
          AMAZON_GOTO_CHECKOUT,
      ) as HTMLInputElement;
      return button.click();
    }, BookRepository.AMAZON_GOTO_CHECKOUT);

    await Promise.all([page.waitForNavigation(), checkoutEvent]);
    // page.screenshot({path: '4 checkout url.png'});
    LoggerService.info('checkout url', page.url());
    return {checkoutURL: page.url(), cartURL};
  }

  private processError(error: Error | any) {
    if (error instanceof puppeteer.errors.TimeoutError) {
      return new ResponseError(
          BookRepository.PAGE_TIMEOUT_MESSAGE,
          ResponseError.REQUEST_TIMEOUT,
      );
    }
    return new ResponseError(error.message, ResponseError.UNPROCESSABLE);
  }
}

export default BookRepository;
