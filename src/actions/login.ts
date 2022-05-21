import puppeteer from 'puppeteer';
import { WAITFOR_OPTIONS } from '../utils/constants';
import { logProcess, logSuccess } from '../utils/logger';

import 'dotenv/config';

const elements = {
  signInLink: 'li[data-component="SignIn"]',
  loginWithEpicBtn: 'div#login-with-epic',
  email: 'input#email',
  pass: 'input#password',
  signInBtn: 'button#sign-in',
  signedInUser: 'span.display-name',
};

const login = async (page: puppeteer.Page) => {
  if (process.env.EMAIL === undefined) {
    throw new Error('email is undefined');
  }
  if (process.env.PASSWORD === undefined) {
    throw new Error('password is undefined');
  }

  logProcess('clicking sign in link');
  await page.waitForSelector(elements.signInLink, WAITFOR_OPTIONS);
  await page.click(elements.signInLink);

  logProcess('clicking sign in with epic games');
  await page.waitForSelector(elements.loginWithEpicBtn, WAITFOR_OPTIONS);
  await page.click(elements.loginWithEpicBtn);

  logProcess('setting credentials');
  await page.waitForSelector(elements.email, WAITFOR_OPTIONS);
  await page.type(elements.email, process.env.EMAIL, {
    delay: 100,
  });
  await page.waitForSelector(elements.pass, WAITFOR_OPTIONS);
  await page.type(elements.pass, process.env.PASSWORD, {
    delay: 100,
  });

  logProcess('logging in');
  await page.click(elements.signInBtn);
  await page.waitForSelector(elements.signedInUser, WAITFOR_OPTIONS);
  logSuccess('successfully signed in');
};

export default login;
