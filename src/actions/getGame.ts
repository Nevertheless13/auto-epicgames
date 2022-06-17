import puppeteer from 'puppeteer';
import { WAITFOR_OPTIONS } from '../utils/constants';
import { logProcess, logSuccess, logError } from '../utils/logger';

const getGame = async (page: puppeteer.Page, freeGameUrl: string) => {
  logProcess(`navigating to ${freeGameUrl}`);
  await page.goto(freeGameUrl);

  const continueBtn =
    '[data-component="PDPAgeGate"] [data-component="BaseButton"]';
  await page.waitForTimeout(5000);
  const continueBtnExists = await page.evaluate(
    () =>
      !!document.querySelector(
        '[data-component="PDPAgeGate"] [data-component="BaseButton"]'
      )
  );
  if (continueBtnExists) {
    logProcess('clicking 18+ continue btn');
    await page.click(continueBtn);
  }

  logProcess('checking the game status');
  await page.waitForSelector(
    'button[data-testid="purchase-cta-button"]',
    WAITFOR_OPTIONS
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
    WAITFOR_OPTIONS
  );
  const contentFrame = await iFrameModal?.contentFrame();
  const placeOrderBtn = await contentFrame?.waitForSelector(
    'button.payment-btn',
    WAITFOR_OPTIONS
  );
  logProcess('clicking place order');
  await placeOrderBtn?.click();

  logProcess('finalizing order');
  await page.waitForSelector('div[role="dialog"]', WAITFOR_OPTIONS);
  logSuccess('successfully got game');
};

export default getGame;
