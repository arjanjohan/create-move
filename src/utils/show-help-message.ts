import chalk from "chalk";

export const showHelpMessage = () => {
  console.log(` ${chalk.bold.blue("Usage:")}
    ${chalk.bold.green("npx create-eth<@version>")} ${chalk.gray("[-i | --install | --skip | --skip-install] [-h | --help]")}
`);
  console.log(` ${chalk.bold.blue("Options:")}
    ${chalk.gray("-i, --install")}                Install packages
    ${chalk.gray("--skip, --skip-install")}       Skip packages installation
    ${chalk.gray("-h, --help")}                   Help
    `);
};
