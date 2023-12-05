import nextJest from 'next/jest.js'
import { createRequire } from 'module';

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  preset: "ts-jest",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  testEnvironmentOptions: { // DO NOT REMOVE FOR SOME REASON FIXED TESTING
    customExportConditions: [] // don't load "browser" field
  },
};

export default createJestConfig(customJestConfig)