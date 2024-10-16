import type { Args, RawOptions } from "../types";
import arg from "arg";
import * as https from "https";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const validateExternalExtension = async (
  extensionName: string,
  dev: boolean,
): Promise<{ repository: string; branch?: string } | string> => {
  if (dev) {
    // Check externalExtensions/${extensionName} exists
    try {
      const currentFileUrl = import.meta.url;
      const externalExtensionsDirectory = path.resolve(
        decodeURI(fileURLToPath(currentFileUrl)),
        "../../externalExtensions",
      );
      await fs.promises.access(`${externalExtensionsDirectory}/${extensionName}`);
    } catch {
      throw new Error(`Extension not found in "externalExtensions/${extensionName}"`);
    }

    return extensionName;
  }

  // For non-dev mode, we'll assume a simple check for now
  // This can be expanded later if needed
  const githubUrl = `https://github.com/${extensionName}`;
  
  // Check if repository exists
  await new Promise((resolve, reject) => {
    https
      .get(githubUrl, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`Extension not found: ${githubUrl}`));
        } else {
          resolve(null);
        }
      })
      .on("error", err => {
        reject(err);
      });
  });

  return { repository: githubUrl };
};

export async function parseArgumentsIntoOptions(
  rawArgs: Args,
): Promise<{ rawOptions: RawOptions }> {
  const args = arg(
    {
      "--skip-install": Boolean,
      "--skip": "--skip-install",

      "--dev": Boolean,

      "--help": Boolean,
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2).map(a => a.toLowerCase()),
    },
  );

  const skipInstall = args["--skip-install"] ?? null;

  const dev = args["--dev"] ?? false; // info: use false avoid asking user

  const help = args["--help"] ?? false;

  const project = args._[0] ?? null;

  return {
    rawOptions: {
      project,
      install: !skipInstall,
      dev,
      help,
    },
  };
}
