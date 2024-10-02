import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Cribl} from "../index";
import {Script} from "../objects/scripts";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

describe('scripts', () => {
	it('should be written to the file', () => {
		new Script(cribl, 'test', {command: 'echo', args: ['hello', '$HELLO'], env: {HELLO: 'world'}});
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/scripts.yml']);
		expect(volume['/tmp/local/cribl/scripts.yml']).toMatchSnapshot();
	})
})
