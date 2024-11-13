import { Options, RawOptions } from "../types";
import inquirer from "inquirer";

// Define Move template options
const MOVE_TEMPLATES = {
  BASIC: "basic",
  DEFI: "defi",
  NFT: "nft",
  TOKEN: "token",
  RANDOM: "random",
};

// default values for unspecified args
const defaultOptions: RawOptions = {
  project: "my-move-app",
  install: true,
  dev: false,
  help: false,
};

export async function promptForMissingOptions(
  options: RawOptions): Promise<Options> {
  const cliAnswers = Object.fromEntries(Object.entries(options).filter(([, value]) => value !== null));
  const questions = [
    {
      type: "input",
      name: "project",
      message: "Your project name:",
      default: defaultOptions.project,
      validate: (value: string) => value.length > 0,
    },
    {
      type: "list",
      name: "moveTemplate",
      message: "Which Move template do you want to use?",
      choices: [
        { name: "On-chain Bio (default)", value: MOVE_TEMPLATES.BASIC },
        { name: "DeFi (coming soon)", value: MOVE_TEMPLATES.DEFI, disabled: true },
        { name: "NFT (coming soon)", value: MOVE_TEMPLATES.NFT, disabled: true },
        { name: "Token (coming soon)", value: MOVE_TEMPLATES.TOKEN, disabled: true },
        { name: "Random (coming soon)", value: MOVE_TEMPLATES.RANDOM, disabled: true },
      ],
      default: MOVE_TEMPLATES.BASIC,
    },
  ];

  const answers = await inquirer.prompt(questions, cliAnswers);

  const mergedOptions: Options = {
    project: options.project ?? answers.project,
    install: options.install,
    dev: options.dev ?? defaultOptions.dev,
  };

  return mergedOptions;
}
