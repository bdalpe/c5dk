import {PackFetcher} from "./index";
import {Volume} from "memfs";
import fs from "node:fs";
import tar from "tar-stream";
import {createGunzip} from "node:zlib";

export class FilePackFetcher extends PackFetcher {
	protected vol: InstanceType<typeof Volume> = new Volume();

	protected extractTarball(path: string) {
		return new Promise((resolve, reject) => {
			const pack = fs.createReadStream(path);
			const extract = tar.extract()

			extract.on('entry', async (header, stream, next) => {
				const filePath = `/${header.name}`;

				if (header.type === 'directory') {
					// Create a directory in memfs
					await this.vol.mkdir(filePath, {recursive: true}, next);
					stream.resume(); // Skip directory data
				} else if (header.type === 'file') {
					// Write file contents to memfs
					const chunks: Uint8Array[] = [];
					stream.on('data', (chunk) => chunks.push(chunk));
					stream.on('end', async () => {
						await this.vol.writeFile(filePath, Buffer.concat(chunks), next);
					});
				} else {
					// Skip unsupported entry types
					stream.resume();
					next();
				}
			});

			pack
				.pipe(createGunzip())
				.pipe(extract)
				.on('error', reject)
				.on('finish', resolve)
		});
	}

	fetch(url: string): Promise<InstanceType<typeof Volume>> {
		return new Promise((resolve, reject) => {
			this.extractTarball(url).then(() => {
				resolve(this.vol);
			}).catch(reject);
		});
	}
}
