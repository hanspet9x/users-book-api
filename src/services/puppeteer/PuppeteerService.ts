import puppeteer from "puppeteer";
import { PuppeteerConfig } from "../../config/puppeteer.config";
import ResponseError from "../response/ResponseError";
import { IGenreResponse } from "./interface/genre.types";
class PuppeteerService {
  static service: PuppeteerService;
  static browser: puppeteer.Browser;
  static url: string;
  static MODAL_TIMEOUT: number = 3000;
  static BOOK_NOT_FOUND: string = "Book not found";

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

  async getPage(
    url: string,
    waitForselector: string,
    lifecycle?: puppeteer.PuppeteerLifeCycleEvent
  ) {
    try {
      const page = await PuppeteerService.browser.newPage();
      await page.goto(url, {
        waitUntil: lifecycle || "networkidle2",
        timeout: PuppeteerConfig.PAGE_TIMEOUT,
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
        PuppeteerService.url,
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
      const page = await this.getPage(genreURL, "div.pollContents", "domcontentloaded");
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
        console.log('Book size ='+books.length+' book rand='+random)
        const bookId = (books[random] as HTMLElement).dataset.resourceId;
        return `[data-resource-id="${bookId}"]`;
      });
    } catch (error) {
      throw this.processError(error);
    }
  }

  private async closeSignInModal(page: puppeteer.Page) {
    try {
      await page.waitForTimeout(PuppeteerService.MODAL_TIMEOUT);
      await page.screenshot({ path: "hover.png" });
      const button = await page.$('.modal__close > button.gr-iconButton');
      if(button) {
        await button.evaluate(node => (node as HTMLElement).click())
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
      await toolTipContainer?.waitForSelector('section');
      const amazonClickEvent = toolTipContainer?.evaluateHandle((el) => {
        const amazonLink = el?.querySelector('a#buyButton') as HTMLAnchorElement;
        amazonLink.target = '';
        amazonLink.rel = '';
        return amazonLink.click();
        
      });
      await Promise.all([page.waitForNavigation(), amazonClickEvent])
      page.screenshot({path: 'hover4.png'});
    } catch (error) {
      throw this.processError(error);
    }
  }  

  private async gotoAmazon(randomBookId: string, page: puppeteer.Page) {
    try {
      //hover to odisplay the amazon tooltip
      await Promise.all([page.waitForNavigation(), page.click(randomBookId)])
      const amazonLinkEvent = page.evaluate(() => {
        const amazonLink = document.querySelector('a#buyButton') as HTMLAnchorElement;
        amazonLink.target = '';
        amazonLink.rel = '';
        return amazonLink.click();
      })

      await Promise.all([page.waitForNavigation(), amazonLinkEvent]);
      page.screenshot({path: 'hover4.png'});
    } catch (error) {
      console.error((error as any).message);
      throw this.processError(new ResponseError(PuppeteerService.BOOK_NOT_FOUND, 404));
    }
  }

  private async addToCart(page: puppeteer.Page){
    const cartEvent = page.evaluate(() => {
      const button = document.querySelector('input#add-to-cart-button') as HTMLInputElement;
      return button.click();
    });
    await Promise.all([page.waitForNavigation(), cartEvent]);
    page.screenshot({path: 'hover5.png'});
  }  
  
  private async getCheckOutURL(page: puppeteer.Page){
    const checkoutEvent = page.evaluate(() => {
      const button = document.querySelector('input[name="proceedToRetailCheckout"]') as HTMLInputElement;
      return button.click();
    });
    await Promise.all([page.waitForNavigation(), checkoutEvent]);
    page.screenshot({path: 'hover6.png'});
    return page.url();
  }

  private processError(error: Error | any) {
    console.error(error);
    if (error instanceof puppeteer.errors.TimeoutError) {
      return new ResponseError(PuppeteerConfig.PAGE_TIMEOUT_SIGNAL, 408);
    }
    return new ResponseError(error.message, 417);
  }
}

export default PuppeteerService;