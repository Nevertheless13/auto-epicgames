import puppeteer from 'puppeteer';
import { BASE_URL, WAITFOR_OPTIONS } from '../utils/constants';
import { logProcess, logSuccess } from '../utils/logger';

const getGameUrls = async (page: puppeteer.Page) => {
  const linkElems = 'a[role="link"] div span';
  const baseUrl = BASE_URL;

  logProcess('getting free games urls');
  await page.waitForSelector(linkElems, WAITFOR_OPTIONS);
  const allLinks = await page.$$(linkElems);

  const tempLinks = [];
  for (const element of allLinks) {
    const textOfLink = await element.evaluate((elem) => {
      if (elem.textContent?.toLowerCase() === 'free now') {
        let elemParent: typeof elem.parentElement = null;

        for (let index = 0; index < 20; index++) {
          if (!elemParent) {
            elemParent = elem.parentElement; // first run
          }

          if (elemParent?.getAttribute('href')) {
            return elemParent.getAttribute('href');
          }

          elemParent = elemParent?.parentElement ?? null;
        }
      }

      return null;
    });

    tempLinks.push(textOfLink);
  }

  const freeGamesSelector = tempLinks
    .filter((link) => link)
    .map((link) => `${baseUrl}/${link}`);

  logSuccess('got game urls');

  return freeGamesSelector;
};

export default getGameUrls;
