import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Cribl} from "../index";
import {Regex} from "../objects";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

describe('Regexex', () => {
	it('should be written to the file', () => {
		new Regex(cribl, 'test', {lib: 'test', regex: '/test/'});
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/regexes.yml']);
		expect(volume['/tmp/local/cribl/regexes.yml']).toMatchSnapshot();
	});
});
