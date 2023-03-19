import path from "path";
import { z } from "zod";
import { Project, Node } from "ts-morph";
import { format } from "prettier";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const user_root = process.env.CALLEE_CWD ?? process.cwd();

function applyCodemod(opts: {
  project: Project;
  plugin: string;
  filepath: string;
}) {
  // TODO: make some nice abstractions to handle multiple plugins and files
  // For now, I'll just make a codemod for Clerk's _app wrapper

  const sourcefiles = opts.project.getSourceFiles();
  const source = sourcefiles.find(
    (file) => file.getBaseName() === opts.filepath
  );
  if (!source) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `File ${opts.filepath} not found`, // TODO: just create the file instead?
    });
  }

  const original = source.getText();

  source.addImportDeclaration({
    moduleSpecifier: "@clerk/nextjs",
    namedImports: ["ClerkProvider"],
  });

  const app = source.getVariableDeclaration("MyApp");
  app?.forEachDescendant((node) => {
    if (Node.isJsxElement(node) || Node.isJsxSelfClosingElement(node)) {
      // wrap the component in ClerkProvider
      const text = node.getText();
      node.replaceWithText(
        `<ClerkProvider {...pageProps}>${text}</ClerkProvider>`
      );
    }
  });

  const formatted = format(source.getText(), { parser: "typescript" });

  return {
    original,
    modified: formatted,
  };
}

export const sourceRouter = createTRPCRouter({
  file: publicProcedure
    .input(z.object({ file: z.string() }))
    .query(({ input }) => {
      const project = new Project({
        tsConfigFilePath: path.join(user_root, "tsconfig.json"),
      });

      const { original, modified } = applyCodemod({
        project,
        plugin: "CLERK",
        filepath: input.file,
      });
      return { original, modified, language: "typescript" };
    }),
});
