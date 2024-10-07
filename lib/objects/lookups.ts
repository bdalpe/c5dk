import {ConfigConstruct} from "../config";
import {File} from "../private/fs";
import {Construct} from "constructs";
import Registry from "../registry";
import {pick} from "es-toolkit";

export interface LookupProps {
	/**
	 *
	 * Must match pattern ^\s*\w[\w -]+(?:\.csv|\.gz|\.csv\.gz|\.mmdb)?\s*$
	 */
	size?: number;
	rows?: number;
	description?: string;
}

const fileNamePattern = new RegExp(/^\s*\w[\w -]+(?:\.csv|\.gz|\.csv\.gz|\.mmdb)?\s*$/);

export class Lookup extends ConfigConstruct {
	protected lookup: Buffer;
	protected type: string;

	constructor(scope: Construct, fileName: string, file: Buffer, props?: LookupProps) {
		if (!fileNamePattern.test(fileName)) {
			throw new Error(`File name ${fileName} must match pattern ${fileNamePattern}`);
		}

		const _props = {
			size: file.length,
			rows: Buffer.from(file).toString().split('\n').length,
			...props // override the defaults
		}

		super(scope, fileName, _props);

		this.lookup = file;

		// Handle the file type
		const parts = fileName.split('.');
		if (parts.length === 1) this.type = 'csv';
		else this.type = fileName.substring(fileName.indexOf('.') + 1);
	}

	get kind() {
		return 'lookups';
	}

	static dump(config: ConfigConstruct[]): undefined {
		return undefined;
	}

	synth(): void {
		const config = this.toYaml(pick(this.config, ['size', 'rows', 'description']));

		new File(this.path('data', 'lookups', `${this.node.id.split('.').shift()}.${this.type}`)).write(this.lookup);
		new File(this.path('data', 'lookups', `${this.node.id.split('.').shift()}.yml`)).write(config);
	}
}

Registry.register('lookups', Lookup);
