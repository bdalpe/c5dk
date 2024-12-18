import {it, describe} from 'vitest';
import {Cribl} from "../index";
import {Pack} from "../objects";
import path from "node:path";

describe('Packs', async () => {
	it('should write content', () => {
		const cribl = new Cribl();
		new Pack(cribl, 'cribl-palo-alto-networks', path.join(__dirname, '__fixtures__', 'cribl-palo-alto-networks-d6bc6883-1.1.5.crbl'));
		cribl.synth();

		// TODO: Fix!
		// expect(Object.keys(volume)).toStrictEqual(expect.arrayContaining(['/tmp/data/packs/cribl-palo-alto-networks/lookups/device_info.csv']));
	});
});
