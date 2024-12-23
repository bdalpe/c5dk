import {ConfigConstruct} from "./config";
import {ContainerConstruct} from "./container";

class Registry {
	protected static constructs: Record<string, typeof ConfigConstruct> = {};
	protected static containers: Record<string, typeof ContainerConstruct> = {};

	constructor() {}

	register(type: string, construct: typeof ConfigConstruct) {
		if (!Registry.constructs[type]) {
			Registry.constructs[type] = construct;
		}
	}

	registerContainer(type: string, construct: typeof ContainerConstruct) {
		if (!Registry.containers[type]) {
			Registry.containers[type] = construct;
		}
	}

	get registry() {
		return Registry.constructs;
	}

	get containerRegistry() {
		return Registry.containers;
	}
}

export default new Registry();
