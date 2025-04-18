import { defineConfig } from 'eslint/config';
import cheminfo from 'eslint-config-cheminfo';

export default defineConfig([
  ...cheminfo,
  {
    languageOptions: {},
    rules: {},
  },
]);
