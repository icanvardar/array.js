import { promises as fs } from "fs";
import { join, dirname } from "path";
import { $ } from "bun";

async function copyFiles(srcDir: string, destDir: string, ext: string) {
	const result = await $`find ${srcDir} -name "*.${ext}"`;
	const files = result.stdout.toString().trim().split("\n");

	for (const filePath of files) {
		const relativePath = filePath.replace(srcDir, "");
		const destPath = join(destDir, relativePath);

		await fs.mkdir(dirname(destPath), { recursive: true });
		await fs.copyFile(filePath, destPath);
	}
}

export function copyDeclarationFiles(): import("bun").BunPlugin {
	return {
		name: "copy-declaration-files",
		async setup(build) {
			const outDir = build.config.outdir || "out";
			const srcDir = "src";

			await copyFiles(srcDir, outDir, "d.ts");
		},
	};
}
