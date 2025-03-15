import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import buildHelpers from "./build/buildHelpers.js";
import mdTemplatePlugin from "./build/mdTemplatePlugin.js";

const { FILEPATH, mdTemplateConfig } = buildHelpers.getConfig();

export default {
  input: "src/main.ts",
  output: {
    file: FILEPATH,
    format: "cjs",
  },
  external: ["obsidian"],
  plugins: [
    typescript(),
    nodeResolve(),
    babel({
      presets: ["@babel/preset-typescript"],
    }),
    mdTemplatePlugin(mdTemplateConfig),
    commonjs(),
    cleanup(),
  ],
};
