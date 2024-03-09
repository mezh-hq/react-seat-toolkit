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

build({
  entryPoints: ["./src/index.tsx"],
  bundle: true,
  outdir: "./dist",
  platform: "browser",
  format: "esm",
  minify: false,
  sourcemap: true,
  keepNames: true,
  loader: {
    ".png": "file"
  },
  plugins: [cleaner],
  external: ["react", "react-dom", "@dreamworld/addon-redux"]
});
