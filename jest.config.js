const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const moduleNameMapper = {
  ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  "/^fs$/": "fs.ts"
};

module.exports = {
  rootDir: './src',
  moduleNameMapper,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['../setup-jest.ts'],
};
