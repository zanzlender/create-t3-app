import path from "path";
import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  clean: true,
  dts: true,
  entry: ["cli.ts"],
  format: ["esm"],
  minify: !opts.watch,
  metafile: !opts.watch,
  sourcemap: true,
  tsconfig: path.join(__dirname, "tsconfig.cli.json"),
  target: "esnext",
  outDir: "dist",
  onSuccess: opts.watch ? "node dist/cli.js" : undefined,
}));
