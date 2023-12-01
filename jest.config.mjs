import nextJest from 'next/jest.js'
import { createRequire } from 'module';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: "ts-jest",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  // transformIgnorePatterns: ['nodemodules/(?!@fullcalendar)'],
  // moduleNameMapper: {
  //   // Handle module aliases (this will be automatically configured for you soon)
  //   '^@/components/(.*)$': '<rootDir>/components/$1',
  //   '\\.css$': '<rootDir>/emptyModule.js',
  //   '^@/app/(.*)$': '<rootDir>/app/$1',
  // },
  testEnvironmentOptions: { // DO NOT REMOVE FOR SOME REASON FIXED TESTING
    customExportConditions: [] // don't load "browser" field
  }

};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)