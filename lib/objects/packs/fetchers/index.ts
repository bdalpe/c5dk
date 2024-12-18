import {Volume} from "memfs";

export abstract class PackFetcher {
	abstract fetch(url: string): Promise<InstanceType<typeof Volume>>;
}
