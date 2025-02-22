import fs from "fs";
import path from "path";
import { execa } from "execa";
import { Options } from "../types";

export async function copyTemplateFiles(options: Options, _templateDir: string, targetDir: string) {
  try {
    // Clone the latest scaffold-move template from GitHub
    await execa("git", [
      "clone",
      "--depth=1",
      "https://github.com/arjanjohan/scaffold-move.git",
      targetDir
    ]);

    // Remove the .git directory to start fresh
    const gitDir = path.join(targetDir, ".git");
    await fs.promises.rm(gitDir, { recursive: true, force: true });

    console.log(`Successfully cloned template to ${targetDir}`);
  } catch (error) {
    console.error("Error cloning template:", error);
    throw error;
  }
}
