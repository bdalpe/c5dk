import {ConfigConstruct} from "../config";
import {Construct} from "constructs";
import Registry from "../registry";

export interface RegexProps {
	lib: string;

	description?: string;

	regex: string;

	sampleData?: string;

	tags?: string;
}

export class Regex extends ConfigConstruct {
	constructor(scope: Construct, id: string, props: RegexProps) {
		super(scope, id, props);
	}

	get kind() {
		return 'regexes';
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> {
		return Object.fromEntries(config.map(c => [c.node.id, c.config]));
	}
}

Registry.register('regexes', Regex);
