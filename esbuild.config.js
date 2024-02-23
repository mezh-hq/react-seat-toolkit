import { execSync } from "child_process";
import { build } from "esbuild";

execSync("rm -rf ./dist && mkdir dist");

build({
  entryPoints: ["./src/index.tsx"],
  bundle: true,
  outdir: "./dist",
  platform: "browser",
  format: "esm",
  minify: true,
  sourcemap: true,
  keepNames: true,
  loader: {
    ".png": "file"
  }
});
