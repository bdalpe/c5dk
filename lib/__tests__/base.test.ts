import { describe, it, expect } from 'vitest';
import { Cribl } from '../index';
import { Construct } from 'constructs';

describe('Cribl', () => {
  it('should create an instance of Cribl', () => {
    const cribl = new Cribl();
    expect(cribl).toBeInstanceOf(Cribl);
  });

  it('should extend Construct', () => {
    const cribl = new Cribl();
    expect(cribl).toBeInstanceOf(Construct);
  });
});
