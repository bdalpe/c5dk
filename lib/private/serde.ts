import {dump as yamldump, load as yamlload} from "js-yaml";

export abstract class SerDe {
	abstract serialize(contents: object): string;
	abstract deserialize(contents: string): object;
}

export class YAMLSerDe extends SerDe {
	serialize(contents: object): string {
		return yamldump(contents);
	}

	deserialize(contents: string): object {
		return yamlload(contents) as object;
	}
}

export class JSONSerDe extends SerDe {
	serialize(contents: object): string {
		return JSON.stringify(contents);
	}

	deserialize(contents: string): object {
		return JSON.parse(contents);
	}
}
