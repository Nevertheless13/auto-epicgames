import puppeteer from 'puppeteer';

import elements from './elements';
import { logProcess, logSuccess, logError } from './utils/logger';

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://www.epicgames.com/store/en-US/free-games');

  const waitForOptions = { visible: true };

  logProcess('clicking sign in link');
  await page.waitForSelector(elements.signInLink + 'age', waitForOptions);

  // await page.click(elements.signInLink);
  // logSuccess('successfully clicked');

  // logProcess('clicking sign in with epic games');
  // await page.waitForSelector(elements.signInLink, waitForOptions);
  // await page.click(elements.signInLink);
  // logSuccess('successfully clicked');

  // await page.waitForTimeout(30000);
  await browser.close();
})();
