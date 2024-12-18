import {URLPackFetcher} from "./url";
import {Volume} from "memfs";

interface DispensaryItem {
	name: string;
	version: string;
}

export class DispensaryPatchFetcher extends URLPackFetcher {
	fetch(url: string): Promise<InstanceType<typeof Volume>> {
		return new Promise(async (resolve, reject) => {
			const dispensary = await fetch('https://packs.cribl.io/storage/dispensary.json');

			if (!dispensary.ok) {
				return reject(new Error(`Failed to fetch dispensary: ${dispensary.statusText}`));
			}

			const dispensaryJson: DispensaryItem[] = await dispensary.json();
			const pack: DispensaryItem | undefined = dispensaryJson.find((entry: DispensaryItem) => entry.name == url);

			if (!pack) {
				return reject(new Error(`Pack not found in dispensary: ${url}`));
			}

			const downloadUrl = `https://packs.cribl.io/dl/${pack.name}/${pack.version}/${pack.name}-${pack.version}.crbl`
			console.log("dl from", downloadUrl)

			super.fetch(downloadUrl).then((vol) => {


				resolve(vol);
			});
		})
	}
}
