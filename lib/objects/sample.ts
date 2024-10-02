import {File} from "../private/fs";
import {createReadStream, PathLike, statSync} from "node:fs";
import {basename} from "node:path";
import {Encoding} from "node:crypto";
import {ConfigConstruct} from "../config";
import type {Construct} from "constructs";

/**
 *   sampleName: sample_20241001-101839.log
 *   created: 1727795921467
 *   size: 76
 *   numEvents: 1
 */
export interface SampleProps {
	/**
	 * The displayed name of the sample
	 */
	sampleName?: string;
	/**
	 * The timestamp of the sample
	 */
	created: number;
	/**
	 * The size of the sample
	 */
	size: number;
	/**
	 * The number of events in the sample
	 */
	numEvents: number;
}

/**
 *
 */
export class Sample extends ConfigConstruct {
	protected file: Buffer;

	/**
	 *
	 * @param scope
	 * @param id
	 * @param file
	 * @param props
	 */
	constructor(scope: Construct, file: Buffer, id?: string, props?: SampleProps) {
		const _props = {
			sampleName: `sample_${new Date().getTime()}.log`,
			created: new Date().getTime(),
			size: file.length,
			numEvents: file.toString().split('\n').length,
			...props
		}

		// if id is undefined, generate a 6 character random id
		id ??= Math.random().toString(36).substring(2, 8);

		super(scope, id, _props);

		this.file = file;
	}

	get kind() {
		return 'sample';
	}

	synth(): [string, unknown] {
		// write sample data to the samples folder
		new File(this.path('data', 'samples', `${this.node.id}.json`)).write(this.file);

		return [this.node.id, this.config]
	}
}

export interface SampleTransformerProps {
	breaker: RegExp;
	encoding: Encoding;
}

/**
 * Takes raw sample files and transforms them into a format that can be used by the Cribl platform.
 */
export class SampleTransformer {
	protected file: PathLike;
	protected fileName: string | undefined;
	protected created: number;
	protected encoding: Encoding;
	protected breaker: RegExp;
	protected events: string[] = [];

	constructor(file: PathLike, props: SampleTransformerProps) {
		// if string or buffer, read the file
		this.file = file;
		this.encoding = props.encoding;
		this.breaker = props.breaker;

		const stats = statSync(file);
		if (file instanceof URL) {
			let fileName: string = file.pathname;

			if (fileName.indexOf('#') > -1) {
				fileName = fileName.split('#').shift()!;
			}

			if (fileName.indexOf('?') > -1) {
				fileName = fileName.split('?').shift()!;
			}

			this.fileName = fileName.split('/').pop()!;
		} else if (typeof file === 'string') {
			this.fileName = basename(file);
		}

		this.created = stats.ctimeMs
	}

	transform() {
		let partialString: string | undefined = '';

		// Use a read stream to process the file
		const stream = createReadStream(this.file);

		stream.on('data', (chunk) => {
			let chunkStr = partialString + chunk.toString('utf8');

			// Split the chunk based on the delimiter (e.g., newlines)
			const parts = chunkStr.split(this.breaker);

			// Keep the last part as it might be incomplete (partial match)
			partialString = parts.pop(); // Remove and save the incomplete part

			// Add the complete parts to the matches array
			this.events.push(...parts);
		});

		stream.on('end', () => {
			if (partialString) {
				this.events.push(partialString);
			}
		});

		stream.on('error', (error: unknown) => {
			console.error("Error reading sample file: ", error);
		});
	}

	/*
	 * 1. Transform the file into an array of objects
	 */
	convert(): { buffer: Buffer, props: SampleProps } {
		const time = new Date().getTime();
		const data = JSON.stringify(this.events.map((event) => ({'_raw': event, '_time': time / 1000})));
		return {
			buffer: Buffer.from(data),
			props: {
				sampleName: this.fileName,
				created: this.created,
				size: data.length,
				numEvents: this.events.length
			}
		}
	}
}
