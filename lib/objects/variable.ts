import {VariableArguments, VariableType} from "../types";
import Registry from "../registry";
import {ConfigConstruct} from "../config";

export interface VariableProps {
	/**
	 * The type of the variable.
	 */
	type: VariableType;

	/**
	 * The library to use for the variable.
	 *
	 * The only supported value is `cribl`.
	 *
	 * You may break things if using a non-supported value!
	 */
	lib?: string;

	/**
	 * The value of the variable.
	 */
	value: string;

	/**
	 * A description of the variable.
	 */
	description?: string;

	/**
	 * A list of arguments to pass to an expression.
	 */
	args?: Array<VariableArguments>;

	/**
	 * A list of tags to display in the UI.
	 */
	tags?: string[];
}

export class Variable extends ConfigConstruct {
	get kind() {
		return 'vars';
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> {
		return Object.fromEntries(config.map(c => [c.node.id, c.config]));
	}
}

Registry.register('vars', Variable);
