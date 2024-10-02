import {describe, it, expect, vi, beforeEach} from 'vitest';
import {fs, vol} from 'memfs'
import {Cribl} from "../cribl";
import {EventBreakerRule, EventBreakerRuleset} from "../cribl/objects/breaker";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
})

describe('Event Breakers', () => {
	describe('Rulesets', () => {
		it('should be written to a file', () => {
			new EventBreakerRuleset(cribl, 'test', {lib: 'custom'});
			cribl.synth();

			const volume = vol.toJSON();
			expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/breakers.yml']);
			expect(volume['/tmp/local/cribl/breakers.yml']).toMatchSnapshot();
		});

		describe('with Rules', () => {
			it('should be written to a file', () => {
				const ruleset = new EventBreakerRuleset(cribl, 'test', {lib: 'custom'});
				new EventBreakerRule(ruleset, 'first', {name: 'first', disabled: false, condition: 'true', type: 'test'});

				cribl.synth();

				const volume = vol.toJSON();
				expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/breakers.yml']);
				expect(volume['/tmp/local/cribl/breakers.yml']).toMatchSnapshot();
			});
		});
	});
});
