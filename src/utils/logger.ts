import chalk from 'chalk';

export const logProcess = (msg: string) => {
  console.log(chalk.bgBlue(msg.toUpperCase()));
};

export const logSuccess = (msg: string) => {
  console.log(chalk.bgGreen(msg.toUpperCase()));
};

export const logError = (msg: string) => {
  console.log(chalk.bgRed(msg.toUpperCase()));
};
