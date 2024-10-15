import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Cribl} from "../index";
import {CriblHTTPInput, CriblTCPInput} from "../objects/input/internal";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

describe('Inputs', () => {
	it('should register the inputs', () => {
		new CriblHTTPInput(cribl, 'cribl_http', {
			mocked: true,
			config: {
				value: 'string',
				array: [
					1,
					'2',
					{value: 3}
				]
			}
		});
		new CriblTCPInput(cribl, 'cribl_tcp', {
			mocked: true,
		});
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toEqual(expect.arrayContaining(['/tmp/local/cribl/inputs.yml']));
		expect(volume['/tmp/local/cribl/inputs.yml']).toMatchSnapshot();
	})
})
