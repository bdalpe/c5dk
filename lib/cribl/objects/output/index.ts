import {ConfigConstruct} from "../../config";

export abstract class Output extends ConfigConstruct {
	get kind() {
		return 'inputs';
	}
}
