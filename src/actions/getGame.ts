import puppeteer from 'puppeteer';
import { logProcess, logSuccess, logError } from '../utils/logger';

const waitForOptions = {
  visible: true,
};

const getGame = async (page: puppeteer.Page) => {
  logProcess('going to free game');
  await page.waitForSelector('a[aria-label*="Free Now"] div', waitForOptions);
  await page.click('a[aria-label*="Free Now"] div');

  logProcess('checking the game status');
  await page.waitForSelector(
    'button[data-testid="purchase-cta-button"]',
    waitForOptions
  );
  const alreadyHaveGame = await page.evaluate(() => {
    const elem = document.querySelector(
      'button[data-testid="purchase-cta-button"][aria-disabled="true"]'
    );
    return !!elem;
  });
  if (alreadyHaveGame) {
    logError('already have the game');
    return;
  }

  logProcess('clicking get game');
  await page.click('button[data-testid="purchase-cta-button"]');

  logProcess('opening modal');
  const iFrameModal = await page.waitForSelector(
    '#webPurchaseContainer > iframe',
    {
      ...waitForOptions,
      timeout: 90000,
    }
  );
  const contentFrame = await iFrameModal?.contentFrame();
  const placeOrderBtn = await contentFrame?.waitForSelector(
    'button.payment-btn',
    waitForOptions
  );
  logProcess('clicking place order');
  await placeOrderBtn?.click();

  logProcess('finalizing order');
  await page.waitForSelector(
    'div[data-component="PostPurchaseModal"]',
    waitForOptions
  );
  logSuccess('successfully got game');
};

export default getGame;
