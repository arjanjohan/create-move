import {
  copyTemplateFiles,
  createProjectDirectory,
  installPackages,
  createFirstGitCommit,
  prettierFormat,
} from "./tasks";
import type { Options } from "./types";
import { renderOutroMessage } from "./utils/render-outro-message";
import chalk from "chalk";
import { Listr } from "listr2";
import path from "path";
import { fileURLToPath } from "url";

export async function createProject(options: Options) {
  console.log(`\n`);

  const currentFileUrl = import.meta.url;

  const templateDirectory = path.resolve(decodeURI(fileURLToPath(currentFileUrl)), "../../templates");

  const targetDirectory = path.resolve(process.cwd(), options.project);

  const tasks = new Listr(
    [
      {
        title: `📁 Create project directory ${targetDirectory}`,
        task: () => createProjectDirectory(options.project),
      },
      {
        title: `🚀 Creating a new Scaffold Move app in ${chalk.green.bold(
          options.project,
        )}`,
        task: () => copyTemplateFiles(options, templateDirectory, targetDirectory),
      },
      {
        title: `📦 Installing dependencies with yarn, this could take a while`,
        task: () => installPackages(targetDirectory),
        skip: () => {
          if (!options.install) {
            return "Manually skipped, since `--skip-install` flag was passed";
          }
          return false;
        },
      },
      {
        title: "🪄 Formatting files",
        task: () => prettierFormat(targetDirectory),
        skip: () => {
          if (!options.install) {
            return "Can't use source prettier, since `yarn install` was skipped";
          }
          return false;
        },
      },
      {
        title: `📡 Initializing Git repository`,
        task: () => createFirstGitCommit(targetDirectory, options),
      },
    ],
    { rendererOptions: { collapseSkips: false, suffixSkips: true } },
  );

  try {
    await tasks.run();
    renderOutroMessage(options);
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"), error);
    console.log("%s Exiting...", chalk.red.bold("Uh oh! 😕 Sorry about that!"));
  }
}
