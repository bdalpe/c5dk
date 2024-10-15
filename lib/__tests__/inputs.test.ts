import {it, expect, vi, beforeEach, describe} from 'vitest';
import {vol} from 'memfs'
import {Certificate, ConfigConstruct, Cribl} from "../index";
import {CriblHTTPInput, CriblTCPInput} from "../objects/input/internal";
import {load} from "js-yaml";
import {NetworkInputProps, TLSProps} from "../objects/input";

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
			port: 1234,
			metadata: [
				{
					name: 'name',
					value: 'value'
				}
			]
		});
		new CriblTCPInput(cribl, 'cribl_tcp', {
			port: 1234,
			metadata: [
				{
					name: 'name',
					value: 'value'
				}
			]
		});
		cribl.synth();

		const volume = vol.toJSON();
		expect(Object.keys(volume)).toEqual(expect.arrayContaining(['/tmp/local/cribl/inputs.yml']));
		expect(volume['/tmp/local/cribl/inputs.yml']).toMatchSnapshot();
	});

	it('should handle a certificate', () => {
		const certificate = `-----BEGIN PRIVATE KEY-----
test
-----END PRIVATE KEY-----`

		const privateKey = `-----BEGIN PRIVATE KEY-----
test
-----END PRIVATE KEY-----`

		const cert = new Certificate(cribl, 'goat', {certificate, privateKey});
		new CriblHTTPInput(cribl, 'cribl_http', {
			...CriblHTTPInput.defaults,
			port: 1234,
			tls: {
				disabled: false,
				certificateName: cert.node.id,
				privKeyPath: cert.privKeyPath,
				certPath: cert.certPath
			}
		})

		cribl.synth();
		const volume = vol.toJSON();

		expect(Object.keys(volume)).toEqual(expect.arrayContaining(['/tmp/local/cribl/inputs.yml']));
		expect(volume['/tmp/local/cribl/inputs.yml']).toMatchSnapshot();

		const config = load(volume['/tmp/local/cribl/inputs.yml']!) as {inputs: {[p: string]: NetworkInputProps}[]};

		expect(config.inputs[0].cribl_http.tls!.certPath).toEqual('/tmp/local/cribl/auth/certs/goat.pem');
	})
})
