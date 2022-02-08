import chalk from 'chalk';

export let counter = 1;

const getMsg = (msg: string) => `${counter}. ${msg.toUpperCase()}\n`;

export const logProcess = (msg: string) => {
  console.log(chalk.black.bgBlue(getMsg(msg)));
  counter++;
};

export const logSuccess = (msg: string) => {
  console.log(chalk.black.bgGreen(getMsg(msg)));
  counter++;
};

export const logError = (msg: string) => {
  console.log(chalk.black.bgRed(getMsg(msg)));
  counter++;
};
