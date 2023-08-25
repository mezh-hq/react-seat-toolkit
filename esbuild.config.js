const execSync = require("child_process").execSync;
const { globPlugin } = require("esbuild-plugin-glob");

execSync("npx rimraf ./dist && mkdir dist");

require("esbuild")
  .build({
    entryPoints: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.png",  "./src/**/*.css", "!./src/stories/**"],
    bundle: false,
    outdir: "./dist",
    platform: "browser",
    format: "cjs",
    minify: true,
    sourcemap: true,
    keepNames: true,
    plugins: [globPlugin()],
    inject: ['./injections/react-shim.js'],
    loader: {
      '.png': 'copy',
      '.css': 'copy',
    },

  })
  .catch(() => process.exit(1));
