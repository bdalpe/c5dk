import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Cribl} from "../index";
import {Regex} from "../objects";
import {Pipeline} from "../objects/pipeline";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

describe('Pipelines', () => {
	it('should only write the pipelines/$PIPELINE/conf.yml', () => {
		new Pipeline(cribl, 'test', {});
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toStrictEqual(['/tmp/local/cribl/pipelines/test/conf.yml']);
		expect(volume['/tmp/local/cribl/pipelines/test/conf.yml']).toMatchSnapshot();
	});
});
