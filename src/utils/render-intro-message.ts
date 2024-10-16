import chalk from "chalk";

export const TITLE_TEXT = `
 ${chalk.bold.yellow("+-+-+-+-+-+-+-+-+-+-+-+-+-+-")}
 ${chalk.bold.yellow("| Create Scaffold Move app |")}
 ${chalk.bold.yellow("+-+-+-+-+-+-+-+-+-+-+-+-+-+-")}
`;

export function renderIntroMessage() {
  console.log(TITLE_TEXT);
}
