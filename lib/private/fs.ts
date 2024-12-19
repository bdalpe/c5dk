import {writeFileSync, mkdirSync, existsSync} from "node:fs";
import {extname, dirname} from 'node:path';
import {readFileSync} from "fs";
import deepmerge from 'deepmerge';
import {JSONSerDe, SerDe, YAMLSerDe} from "./serde";

export class File {
    protected readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

	get directory() {
		return dirname(this.path);
	}

    public write(content: string | NodeJS.ArrayBufferView): void {
        try {
			Directory.ensure(this.directory);

            writeFileSync(this.path, content, 'utf8');
            console.log(`File written successfully to ${this.path}`);
        } catch (error) {
            console.error(`Failed to write file: ${error}`);
        }
    }
}

export class Directory {
	static ensure(path: string) {
		mkdirSync(path, {recursive: true});
	}
}

export class MergeFile extends File {
	protected serde: SerDe;

	constructor(path: string) {
		super(path);

		const ext = extname(this.path);
		switch (ext) {
			case '.json':
				this.serde = new JSONSerDe();
				break;
			default:
				this.serde = new YAMLSerDe();
		}
	}

	protected serialize(content: object): string {
		return this.serde.serialize(content);
	}

	protected deserialize(content: string): object {
		return this.serde.deserialize(content)
	}

	write(content: string | NodeJS.ArrayBufferView): void {
		let current = existsSync(this.path) ? this.deserialize(readFileSync(this.path, 'utf8')) : {};

		const parsed = this.deserialize(content.toString());
		const merged = deepmerge(current, parsed) as object;

		super.write(this.serialize(merged));
	}
}
