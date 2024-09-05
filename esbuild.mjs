// @ts-check
import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");
const minify = process.argv.includes("--minify");

const success = watch ? "Watch build succeeded" : "Build succeeded";

const pad = (i) => i.toString().padStart(2, "0");

function getTime() {
  const date = new Date();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `[${`${hours}h${minutes}:${seconds}`}] `;
}

/** @type {import('esbuild').Plugin[]} */
const plugins = [
  {
    name: "watch-plugin",
    setup: (build) =>
      build.onEnd((result) =>
        result.errors.length === 0 ? console.log(getTime() + success) : null
      ),
  },
];

const ctx = await esbuild.context({
  entryPoints: ["src/extension.ts"],
  outdir: "extension",
  bundle: true,
  target: "ES2017",
  loader: { ".ts": "ts" },
  external: ["vscode"],
  platform: "browser",
  sourcemap: !minify,
define: {
    global: "globalThis",
  },
  minify,
  plugins,

  /**
   * VSCode's extension host is still using cjs,
   * so it's needed to use cjs to avoid any issues.
   */
  format: "cjs",
});

if (watch) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  ctx.dispose();
}
