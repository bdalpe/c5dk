import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Cribl} from "../index";
import {Lookup} from "../objects/lookups";
import {load} from "js-yaml";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

const lookupFile = Buffer.from(`id,value
1,test
2,goat
`)

describe('Lookups', () => {
	it('should only write to data/lookups/{id}', () => {
		new Lookup(cribl, 'test', lookupFile);
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toStrictEqual(expect.arrayContaining(['/tmp/data/lookups/test.yml', '/tmp/data/lookups/test.csv']));
		expect(volume['/tmp/data/lookups/test.csv']).toMatchSnapshot();
	});

	it('should use the correct extension', () => {
		new Lookup(cribl, 'test.csv.gz', lookupFile);
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toStrictEqual(expect.arrayContaining(['/tmp/data/lookups/test.yml', '/tmp/data/lookups/test.csv.gz']));
		expect(volume['/tmp/data/lookups/test.csv.gz']).toMatchSnapshot();
	});

	it('should throw an error if the file name is invalid', () => {
		expect(() => new Lookup(cribl, 'test.fake', lookupFile)).toThrow();
	});

	it('should write the correct metadata', () => {
		new Lookup(cribl, 'test', lookupFile);
		cribl.synth();

		const volume = vol.toJSON();
		const meta = load(volume['/tmp/data/lookups/test.yml'].toString());

		expect(meta).toEqual(expect.objectContaining({
			rows: 4,
			size: 23
		}));
	})
});
