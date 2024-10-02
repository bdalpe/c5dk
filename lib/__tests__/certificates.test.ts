import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Cribl} from "../index";
import {Certificate} from "../objects";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

describe('Certificates', () => {
	it('should be written to the file', () => {
		const certificate = `-----BEGIN PRIVATE KEY-----
test
-----END PRIVATE KEY-----`

		const privateKey = `-----BEGIN PRIVATE KEY-----
test
-----END PRIVATE KEY-----`

		new Certificate(cribl, 'goat', {certificate, privateKey});

		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toEqual(expect.arrayContaining(['/tmp/local/cribl/certificates.yml', '/tmp/local/cribl/auth/certs/goat.pem', '/tmp/local/cribl/auth/certs/goat.key']));
		expect(volume['/tmp/local/cribl/certificates.yml']).toMatchSnapshot();
		expect(volume['/tmp/local/cribl/auth/certs/goat.pem']).toMatchSnapshot();
		expect(volume['/tmp/local/cribl/auth/certs/goat.key']).toMatchSnapshot();
	});
});
