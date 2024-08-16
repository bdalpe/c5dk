import {defineConfig} from "tsup"

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["lib/index.ts"],
	format: ["cjs"],
	sourcemap: true,
	minify: true,
	target: "esnext",
	outDir: "dist",
})
