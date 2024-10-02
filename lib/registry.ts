import {ConfigConstruct} from "./config";

class Registry {
	protected static constructs: Record<string, typeof ConfigConstruct> = {};

	constructor() {}

	register(type: string, construct: typeof ConfigConstruct) {
		if (!Registry.constructs[type]) {
			Registry.constructs[type] = construct;
		}
	}

	get registry() {
		return Registry.constructs;
	}
}

export default new Registry();
