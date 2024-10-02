import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Cribl} from "../index";
import {Parser} from "../objects";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

describe('Parsers', () => {
	it('should be written to the file', () => {
		new Parser(cribl, 'test', {lib: 'test', type: 'test', fields: ['test1', 'test2']});
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/parsers.yml']);
		expect(volume['/tmp/local/cribl/parsers.yml']).toMatchSnapshot();
	});
});
