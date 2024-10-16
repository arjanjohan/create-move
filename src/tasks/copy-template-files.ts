import fs from "fs";
import path from "path";
import { promisify } from "util";
import ncp from "ncp";
import { Options } from "../types";

const copy = promisify(ncp);

export async function copyTemplateFiles(options: Options, templateDir: string, targetDir: string) {
  const scaffoldMoveTemplatePath = path.join(templateDir, "scaffold-move");

  try {
    await copy(scaffoldMoveTemplatePath, targetDir, {
      clobber: false,
      filter: (fileName: string) => {
        // Ignore .git directory
        return !fileName.includes('.git');
      },
    });

    console.log(`Successfully copied template files to ${targetDir}`);
  } catch (error) {
    console.error("Error copying template files:", error);
    throw error;
  }
}
