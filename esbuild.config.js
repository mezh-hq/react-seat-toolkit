import { execSync } from "child_process";
import { build } from "esbuild";
import { globPlugin } from "esbuild-plugin-glob";

execSync("npx rimraf ./dist && mkdir dist");

build({
  entryPoints: [
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.png",
    "./src/**/*.css",
    "!./src/stories/**"
  ],
  bundle: false,
  outdir: "./dist",
  platform: "browser",
  format: "cjs",
  minify: true,
  sourcemap: true,
  keepNames: true,
  plugins: [globPlugin()],
  inject: ["./injections/react-shim.js"],
  loader: {
    ".png": "copy",
    ".css": "copy"
  }
}).catch(() => process.exit(1));
