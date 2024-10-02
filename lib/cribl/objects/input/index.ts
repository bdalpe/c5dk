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
}

// Register Input class in the registry
Registry.register('inputs', Input);
