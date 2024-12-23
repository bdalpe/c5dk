import {describe, it, expect, vi, beforeEach} from 'vitest';
import {Cribl, Variable} from '../index';
import {vol} from "memfs";
import {WorkerGroup} from "../objects/group";

vi.mock('node:fs');
vi.mock('node:fs/promises');

let cribl: Cribl;

beforeEach(() => {
	// reset the state of in-memory fs
	vol.reset()

	cribl = new Cribl({outdir: '/tmp'});
});

describe('Cribl', () => {
  it('without configs should generate nothing', () => {
	  cribl.synth();

	  const volume = vol.toJSON();
	  expect(Object.keys(volume)).toEqual([]);
  });

  it('configs not in a worker group should be at in $CRIBL_HOME/local', () => {
	new Variable(cribl, 'test', {value: 'test'});

	cribl.synth();

	const volume = vol.toJSON();
	expect(Object.keys(volume)).toEqual(['/tmp/local/cribl/vars.yml']);
  });

  it('configs in a worker group should be at in $CRIBL_HOME/groups/$GROUP/local', () => {
	  const group = new WorkerGroup(cribl, 'goat');
	  new Variable(group, 'test', {value: 'test'});

	  cribl.synth();

	  const volume = vol.toJSON();
	  expect(Object.keys(volume)).toEqual(expect.arrayContaining(['/tmp/groups/goat/local/cribl/vars.yml']));
  });

  it('should place configs in the correct scopes', () => {
	  new Variable(cribl, 'test', {value: 'test'});
	  const group = new WorkerGroup(cribl, 'goat');
	  new Variable(group, 'test', {value: 'test'});

	  cribl.synth();

	  const volume = vol.toJSON();
	  expect(Object.keys(volume)).toEqual(expect.arrayContaining([
		  '/tmp/local/cribl/vars.yml',
		  '/tmp/groups/goat/local/cribl/vars.yml'
	  ]));
  });
});
