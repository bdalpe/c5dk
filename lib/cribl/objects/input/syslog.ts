import {Input, InputProps} from "./index";
import {Construct} from "constructs";

export interface SyslogInputProps extends InputProps {}

export class SyslogInput extends Input {
	constructor(scope: Construct, id: string, props: SyslogInputProps) {
		super(scope, id, props);
	}

	get kind() {
		return 'syslog'
	}
}
