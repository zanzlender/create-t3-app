#! /usr/bin/env node

import { execaCommand } from "execa";
import open from "open";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
const PKG_ROOT = path.join(distPath, "../");

async function main() {
  /** Starts the Next.js application. */
  const server = execaCommand("npm run start-ui", {
    cwd: PKG_ROOT,
    env: {
      NODE_ENV: process.env.NODE_ENV, // required
      CALLEE_CWD: process.cwd(), // where the user launched the cli, i.e. their app root
    },
  });

  await new Promise((resolve, reject) => {
    server.stdout?.on("data", (data: Buffer) => {
      const url = data
        .toString()
        .match(/url: .*/)?.[0]
        .split(" ")
        .pop();
      if (url) void open(url);

      if (process.env.NODE_ENV == "development") console.log(data.toString());
    });

    void server.on("error", reject);
    void server.on("exit", resolve);
    void server.on("close", resolve);
  });
}

main().catch((err) => console.error(err));
