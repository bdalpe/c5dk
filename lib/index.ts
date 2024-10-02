import {join} from "node:path";
import {ContainerConstruct} from "./container";

export interface CriblProps {
	/**
	 * The directory to output the Cribl configuration YAML manifests.
	 *
	 * @default - `CRIBL_OUTDIR`, if defined, otherwise `dist`
	 */
	outdir?: string;
}

/**
 * The base construct for all Cribl configuration.
 *
 * @example
 * ```typescript
 * const cribl = new Cribl();
 *
 * // add your config here using cribl as the scope
 * // const group = new Group(cribl, 'default', {});
 * // ...
 *
 * // call synth() to write the configuration to disk
 * cribl.synth();
 * ```
 */
export class Cribl extends ContainerConstruct {
	kind = '';
	public readonly outdir: string;

	constructor(props?: CriblProps) {
		super(undefined as any, '');
		this.outdir = props?.outdir ?? process.env.CRIBL_OUTDIR ?? join(process.cwd(), 'dist');
	}
}

export * from './config';
export * from './container';
export * from './objects';
export * from './types';

export * from './objects/input/splunk_tcp'
export * from './objects/input/syslog'
