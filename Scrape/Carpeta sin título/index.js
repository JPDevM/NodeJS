import puppeteer from "puppeteer";

import { scrapeLogin } from "./app.js";

const baseUrl = "https://dutygestion.com/inicio/";

const scraperObject = {
  url: baseUrl,
  scraper: async (browserInstance) => {
    let page = await browserInstance.newPage();
    console.log(`Navigating to ${scraperObject.url}...`);
    await page.goto(scraperObject.url);

    await scrapeLogin(page);
  },
};

const startBrowser = async () => {
  let browserInstance;
  try {
    console.log("Opening the broser... 👀");
    browserInstance = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }

  return browserInstance;
};

const scrapeAll = async (browserInstance) => {
  let browser;
  try {
    browser = await browserInstance;
    await scraperObject.scraper(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }

  return browser;
};

const scraperController = async (browserInstance) =>
  await scrapeAll(browserInstance);

(async () => {
  let browserInstance = await startBrowser();

  await scraperController(browserInstance);
})();
