import {ContainerConstruct} from "../container";
import {Construct} from "constructs";
import Registry from "../registry";

export interface GroupProps {
	description?: string;
}

export class WorkerGroup extends ContainerConstruct {
	constructor(scope: Construct, id: string, protected props?: GroupProps) {
		super(scope, id, props ?? {});
	}

	get kind() {
		return 'groups';
	}

	static dump(config: ContainerConstruct[]): Record<string, unknown> | undefined {
		return Object.fromEntries(config.map(c => [c.node.id, c.config]));
	}
}

Registry.registerContainer('groups', WorkerGroup)
