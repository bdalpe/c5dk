import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fs, vol } from 'memfs'
import {Cribl} from "../cribl";
import {Variable} from "../cribl/objects/variable";
import {WorkerGroup} from "../cribl/objects/group";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

it('should write a file', () => {
	new Variable(cribl, 'test', {type: 'expression', value: 'test'});
	cribl.synth();

	const volume = vol.toJSON();
	expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/vars.yml']);
	expect(volume['/tmp/local/cribl/vars.yml']).toMatchSnapshot();
})

it('should write a file with arguments', () => {
	new Variable(cribl, 'test', {type: 'expression', value: 'test', args: [{type: 'expression', name: 'test'}]});
	cribl.synth();

	const volume = vol.toJSON();
	expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/vars.yml']);
	expect(volume['/tmp/local/cribl/vars.yml']).toMatchSnapshot();
})

it('should handle multiple variables', () => {
	new Variable(cribl, 'test', {type: 'expression', value: 'test'});
	new Variable(cribl, 'test2', {type: 'expression', value: 'test2'});
	cribl.synth();

	const volume = vol.toJSON();
	expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/vars.yml']);
	expect(volume['/tmp/local/cribl/vars.yml']).toMatchSnapshot();
});

it('should be in a worker group', () => {
	const group = new WorkerGroup(cribl, 'goat')
	new Variable(group, 'test', {type: 'expression', value: 'test'});
	cribl.synth();

	const volume = vol.toJSON();
	expect(Object.keys(volume)).toEqual(['/tmp/groups/goat/local/cribl/vars.yml']);
	expect(volume['/tmp/groups/goat/local/cribl/vars.yml']).toMatchSnapshot();
});
