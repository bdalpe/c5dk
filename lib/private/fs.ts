import {writeFileSync, mkdirSync, readdirSync, lstatSync} from "node:fs";
import {dirname} from 'node:path';

export class File {
    private readonly path: string;

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
