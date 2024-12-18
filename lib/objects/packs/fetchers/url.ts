import {Volume} from "memfs";
import {FilePackFetcher} from "./file";
import {writeFileSync} from "fs";
import tmp from 'tmp';

tmp.setGracefulCleanup();

export class URLPackFetcher extends FilePackFetcher {
	protected vol: InstanceType<typeof Volume> = new Volume();

	/**
	 * Download the pack from a URL and place it into a tempfs location
	 * @param url
	 */
	fetch(url: string): Promise<InstanceType<typeof Volume>> {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(url);
			const tempFile = tmp.fileSync();

			if (!response.ok) {
				return reject(new Error(`Failed to fetch pack: ${response.statusText}`));
			}

			const data = await response.arrayBuffer();

			writeFileSync(tempFile.name, Buffer.from(data));

			super.fetch(tempFile.name).then((vol) => {
				resolve(vol);
			});
		});
	}
}
