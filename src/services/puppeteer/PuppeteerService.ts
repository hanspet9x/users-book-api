import puppeteer from "puppeteer";
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
      PuppeteerService.browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
      });
      PuppeteerService.service = new PuppeteerService();
      return PuppeteerService.service;
    } catch (error) {
      throw error;
    }
  }

  async getPage(waitForselector: string){
    const page = await PuppeteerService.browser.newPage();
    await page.goto(PuppeteerService.url, { waitUntil: "networkidle2" });
    await page.waitForSelector(waitForselector);
    return page;
  }
  async getGenreProps() {
    
    const page = await this.getPage('div.categoryContainer');
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
  }
}

export default PuppeteerService;
