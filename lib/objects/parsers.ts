import {ConfigConstruct} from "../config";
import {Construct} from "constructs";
import Registry from "../registry";

export interface ParserProps {
	/**
	 * Parser library
	 */
	lib: string;

	/**
	 * Brief description of this parser.
	 *
	 * Optional.
	 */
	description?: string;

	/**
	 * One or more tags related to this parser.
	 *
	 * Optional.
	 */
	tags?: string;

	/**
	 * Parser/Formatter type to use.
	 */
	type: string;

	/**
	 * Fields expected to be extracted, in order. If not specified parser will auto-generate.
	 */
	fields: string[];
}

export class Parser extends ConfigConstruct {
	constructor(scope: Construct, id: string, props: ParserProps) {
		super(scope, id, props);
	}

	get kind() {
		return 'parsers';
	}

	static dump(config: ConfigConstruct[]): Record<string, unknown> {
		return Object.fromEntries(config.map(c => [c.node.id, c.config]));
	}
}

Registry.register('parsers', Parser);
