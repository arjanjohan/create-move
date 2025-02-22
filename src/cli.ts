
import { renderIntroMessage } from "./utils/render-intro-message";
import { parseArgumentsIntoOptions } from "./utils/parse-arguments-into-options";
import { promptForMissingOptions } from "./utils/prompt-for-missing-options";
import type { Args } from "./types";
import { showHelpMessage } from "./utils/show-help-message";
import { createProject } from "./main";
import { fileURLToPath } from "url";

// import chalk from "chalk";

async function cli(args: Args) {
    try {
    renderIntroMessage();
    const { rawOptions } = await parseArgumentsIntoOptions(args);
    if (rawOptions.help) {
      showHelpMessage();
      return;
    }

    const options = await promptForMissingOptions(rawOptions);

    await createProject(options);
  } catch (error: any) {
    console.log('🚀 error.');

    // console.error(chalk.red.bold(error.message || "An unknown error occurred."));
    return;
  }
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url) ||
                    process.argv[1].endsWith('create-move');

if (isMainModule) {
  cli(process.argv).catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { cli };