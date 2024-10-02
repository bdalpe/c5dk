import {Input, InputProps} from "./index";
import {Construct} from "constructs";

export interface SplunkTCPInputProps extends InputProps {
	maxS2SVersion?: string;
	useFwdTimezone?: boolean;
}

export class SplunkTCPInput extends Input {
	constructor(scope: Construct, id: string, props: SplunkTCPInputProps) {
		super(scope, id, props);
	}

	get kind() {
		return 'splunk'
	}
}
