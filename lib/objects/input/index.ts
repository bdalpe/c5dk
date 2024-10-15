import Registry from "../../registry";
import {ConfigConstruct} from "../../config";

export interface InputProps {
	disabled?: boolean;
	host?: string;
	port: number;
	sendToRoutes?: boolean;
}

export abstract class Input extends ConfigConstruct {
	get kind() {
		return 'inputs';
	}

	get config() {
		return {
			type: this.kind,
			...super.config
		}
	}
}

// Register Input class in the registry
Registry.register('inputs', Input);
