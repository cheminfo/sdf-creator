import { readFileSync } from 'fs';
import { join } from 'path';

import { create } from '..';

let molecules = JSON.parse(readFileSync(join(__dirname, 'test.json'), 'utf-8'));

describe('SDF Creator', () => {
  it('Check result without field filter', () => {
    let result = create(molecules);
    expect(result.sdf.indexOf('mf')).toBe(439);
    expect(result.sdf.indexOf('density')).toBe(480);
    expect(result.sdf.split('$$$$')).toHaveLength(11);
  });

  it('Check result with key filter', () => {
    let result = create(molecules, { filter: /^(mf|mw|den)/ });
    expect(result.sdf.indexOf('bp')).toBe(-1);
    expect(result.sdf.indexOf('density')).toBeGreaterThan(100);
    expect(result.sdf.indexOf('mf')).toBeGreaterThan(100);
    expect(result.sdf.split('$$$$')).toHaveLength(11);
  });

  it('check strict mode', () => {
    expect(() =>
      create(molecules, { filter: /^(mf|mw|den)/, strict: true }),
    ).toThrow('Array containing emtpy molfiles');
  });

  it('check empty fields', () => {
    let result = create(molecules);
    expect(result.sdf.split('density')).toHaveLength(11);
    expect(result.sdf.split('unique')).toHaveLength(2);
  });
});
