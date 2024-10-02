import type {Construct} from "constructs";
import {dump} from "js-yaml";
import {ConfigConstruct} from "../config";

export interface LicenseProps {
	licenses: string[];
}

export class Licenses extends ConfigConstruct {
	kind = 'licenses';

	constructor(scope: Construct, id: string, protected props: LicenseProps) {
		super(scope, id, props);
	}

	toYaml(): string {
		return dump(this._config);
	}
}
