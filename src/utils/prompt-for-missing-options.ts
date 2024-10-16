import { Options, RawOptions } from "../types";
import inquirer from "inquirer";

// Define Move template options
const MOVE_TEMPLATES = {
  BASIC: "basic",
  DEFI: "defi",
  NFT: "nft",
  TOKEN: "nft",
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
        { name: "Defi", value: MOVE_TEMPLATES.DEFI },
        { name: "NFT", value: MOVE_TEMPLATES.NFT },
        { name: "Token", value: MOVE_TEMPLATES.TOKEN },
      ],
      default: MOVE_TEMPLATES.BASIC,
    },
  ];

  const answers = await inquirer.prompt(questions, cliAnswers);

  const mergedOptions: Options = {
    project: options.project ?? answers.project,
    install: options.install,
    dev: options.dev ?? defaultOptions.dev
  };

  return mergedOptions;
}
