import puppeteer from "puppeteer"; // https://pptr.dev/
import chalk from 'chalk'; // Terminal colors


import { scrapeLogin } from "./app.js";

const baseUrl = "https://dutygestion.com/inicio/";

//config scrapping
const scraperObject = {
  url: baseUrl,
  scraper: async (browserInstance) => {
    let page = await browserInstance.newPage();
    console.log(chalk.green(`✅ Navigating to ${scraperObject.url}...`));
    await page.goto(scraperObject.url);
    console.log(chalk.green(`✅ Url: ${scraperObject.url}...`));
    await scrapeLogin(page);
  },
};

// config browser
const startBrowser = async () => {
  let browserInstance;
  try {
    console.log(chalk.green('✅ Opening the broser...'));
    browserInstance = await puppeteer.launch({
      headless: false, // true background sin webwrowser --> hay que instalar puppeteer-core
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true, // Cors
    });
  } catch (err) {
    console.log(chalk.red('❌ Could not create a browser instance => : ', err));
  }

  return browserInstance;
};

// Scrap all the browser
const scrapeAll = async (browserInstance) => {
  let browser;
  try {
    browser = await browserInstance;
    await scraperObject.scraper(browser);
  } catch (err) {
    console.log(chalk.red('❌ Could not resolve the browser instance => ', err));
  }

  return browser;
};


const scraperController = async (browserInstance) =>
  await scrapeAll(browserInstance);

(async () => {
  let browserInstance = await startBrowser();

  await scraperController(browserInstance);
})();
