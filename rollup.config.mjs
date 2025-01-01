import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "src/main.ts",
	output: {
		format: "cjs",
	},
	external: ["obsidian"],
	plugins: [
		typescript(),
		nodeResolve(),
		babel({
			presets: ["@babel/preset-typescript"],
		}),
		commonjs(),
		cleanup(),
	],
};