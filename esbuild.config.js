import { execSync } from "child_process";
import { build } from "esbuild";

execSync("rm -rf ./dist && mkdir dist");

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
  external: ["react", "react-dom", "@dreamworld/addon-redux"]
});
