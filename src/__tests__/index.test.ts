import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { create } from '../index.ts';

const molecules = JSON.parse(
  readFileSync(join(import.meta.dirname, 'data.json'), 'utf8'),
);

test('check result without field filter', () => {
  const result = create(molecules);
  expect(result.sdf.indexOf('mf')).toBe(439);
  expect(result.sdf.indexOf('density')).toBe(480);
  expect(result.sdf.split('$$$$')).toHaveLength(11);
});

test('check result with key filter', () => {
  const result = create(molecules, { filter: /^(mf|mw|den)/ });
  expect(result.sdf.indexOf('bp')).toBe(-1);
  expect(result.sdf.indexOf('density')).toBeGreaterThan(100);
  expect(result.sdf.indexOf('mf')).toBeGreaterThan(100);
  expect(result.sdf.split('$$$$')).toHaveLength(11);
});

test('check strict mode', () => {
  expect(() =>
    create(molecules, { filter: /^(mf|mw|den)/, strict: true }),
  ).toThrow('Array containing emtpy molfiles');
});

test('check empty fields', () => {
  const result = create(molecules);
  expect(result.sdf.split('density')).toHaveLength(11);
  expect(result.sdf.split('unique')).toHaveLength(2);
});
