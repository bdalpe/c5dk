import {Construct} from "constructs";
import {ConfigConstruct} from "../config";
import Registry from "../registry";

export interface EventBreakerRulesetProps {
	lib: string;
	description?: string;
	tags?: string;
}

export class EventBreakerRuleset extends ConfigConstruct {
	constructor(scope: Construct, id: string, props: EventBreakerRulesetProps) {
		super(scope, id, props);
	}

	get kind() {
		return 'breakers';
	}

	get config(): Record<string, unknown> {
		return {...super.config, rules: this.node.children.filter(x => x instanceof EventBreakerRule).map(rule => rule.config)};
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> {
		return Object.fromEntries(config.map(c => [c.node.id, c.config]));
	}
}

Registry.register('breakers', EventBreakerRuleset);

export interface EventBreakerRuleProps {
	name: string;
	disabled: boolean;
	condition: string;
	type: string;
}

export class EventBreakerRule extends ConfigConstruct {
	constructor(scope: Construct, id: string, props: EventBreakerRuleProps) {
		// Rules can only be children of a ruleset
		if (!(scope instanceof EventBreakerRuleset)) {
			throw new Error('EventBreakerRule must be a child of EventBreakerRuleset');
		}

		super(scope, id, props);
	}

	get kind() {
		return 'rule';
	}
}
