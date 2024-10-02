import {ConfigConstruct} from "../config";
import {Construct} from "constructs";
import Registry from "../registry";

export interface ScriptProps {
	/**
	 * The script to run.
	 */
	command: string;

	/**
	 * A description of the script.
	 */
	description?: string;

	/**
	 * Arguments to pass to the script.
	 */
	args: string[];

	/**
	 * Extra environment variables to set when executing the script.
	 */
	env: Record<string, string>;
}

export class Script extends ConfigConstruct {
	constructor(scope: Construct, id: string, props: ScriptProps) {
		super(scope, id, props);
	}

	get kind() {
		return 'scripts';
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> {
		return Object.fromEntries(config.map(c => [c.node.id, c.config]));
	}
}

Registry.register('scripts', Script);
