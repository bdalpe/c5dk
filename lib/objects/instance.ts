import type {Construct} from "constructs";
import {ConfigConstruct} from "../config";
import Registry from "../registry";

export interface InstanceProps {
	distributed: string[];
}

export class Instance extends ConfigConstruct {
	static package = '_system';
	kind = 'instance';

	constructor(scope: Construct, id: string, protected props: InstanceProps) {
		super(scope, id, props);
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> | undefined {
		return config[0].config;
	}
}

Registry.register('instance', Instance)
