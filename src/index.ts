import puppeteer from 'puppeteer';

import elements from './elements';
import { logProcess, logSuccess, logError } from './utils/logger';

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({
    // headless: true,
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://www.epicgames.com/store/en-US/free-games');

  const waitForOptions = { visible: true };

  try {
    logProcess('clicking sign in link');

    await page.waitForSelector(elements.signInLink, waitForOptions);
    await page.click(elements.signInLink);
    logSuccess('successfully clicked');

    logProcess('clicking sign in with epic games');
    await page.waitForSelector(elements.loginWithEpicBtn, waitForOptions);
    await page.click(elements.loginWithEpicBtn);
    logSuccess('successfully clicked');

    logProcess('signing in');
    await page.waitForSelector(elements.email, waitForOptions);
    await page.type(elements.email, process.env.EMAIL as string);
    await page.waitForSelector(elements.pass, waitForOptions);
    await page.type(elements.pass, process.env.PASSWORD as string);
    // await page.click(elements.signInBtn);
    logSuccess('successfully signed in');
    // await page.waitForTimeout(30000);
  } catch (error) {
    logError('error. Check below');
    console.log(error);
  } finally {
    logProcess('closing browser');
    await browser.close();
    logError('successfully closed browser');
  }
})();
