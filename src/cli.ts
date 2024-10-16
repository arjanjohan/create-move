
import { renderIntroMessage } from "./utils/render-intro-message";
import { parseArgumentsIntoOptions } from "./utils/parse-arguments-into-options";
import { promptForMissingOptions } from "./utils/prompt-for-missing-options";
import type { Args } from "./types";
import { showHelpMessage } from "./utils/show-help-message";
import { createProject } from "./main";

// import chalk from "chalk";

export async function cli(args: Args) {
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
