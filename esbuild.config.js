import { execSync } from "child_process";
import { build } from "esbuild";
import { readFile } from "fs/promises";

execSync("rm -rf ./dist && mkdir dist");

const cleaner = {
  name: "cleaner",
  setup(build) {
    build.onLoad({ filter: /store\/index.ts*/ }, async (args) => {
      const source = await readFile(args.path, "utf8");
      return {
        contents: source.replaceAll(`(await import("@dreamworld/addon-redux")).enhancer`, "null"),
        loader: "ts"
      };
    });
  }
};

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["./src/index.tsx"],
  bundle: true,
  platform: "browser",
  format: "esm",
  minify: true,
  sourcemap: true,
  keepNames: true,
  loader: {
    ".png": "file"
  },
  plugins: [cleaner],
  legalComments: "none",
  external: ["react", "react-dom", "@dreamworld/addon-redux", "tailwindcss-scoped-preflight"]
};

build({
  ...options,
  outfile: "./dist/index.mjs"
});

build({
  ...options,
  format: "cjs",
  outfile: "./dist/index.cjs"
});

build({
  ...options,
  outfile: "./dist/index.slim.js",
  external: [
    ...options.external,
    "@radix-ui/react-checkbox",
    "@radix-ui/react-label",
    "@radix-ui/react-popover",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-select",
    "@radix-ui/react-tooltip",
    "class-variance-authority",
    "lodash",
    "tailwind-merge"
  ]
});
