import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src/'],
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '~/(.*)': '<rootDir>/src/$1',
    '@pages': '<rootDir>/src/pages',
    '@components': '<rootDir>/src/components',
    '@ui': '<rootDir>/src/components/ui',
    '@ui-pages': '<rootDir>/src/components/ui/pages',
    '@utils-types': '<rootDir>/src/utils/types',
    '@api': '<rootDir>/src/utils/burger-api.ts',
    '@slices': '<rootDir>/src/services/slices',
    '@selectors': '<rootDir>/src/services/selectors',
    '@store': '<rootDir>/src/services/store'
  },
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+.[jt]sx?$': [
      'ts-jest',
      {
        tsconfig: {
          allowJs: true,
          jsx: 'react-jsx'
        },
        useESM: true
      }
    ]
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '.*\\.(test|spec)?\\.(ts|tsx)$',
  reporters: ['default', 'github-actions'],
  coverageReporters: ['text', 'text-summary'],
  collectCoverage: true,
  collectCoverageFrom: ['**/services/**'],
  coverageThreshold: {
    global: {
      branches: 51,
      functions: 51,
      lines: 51,
      statements: 51
    }
  },
  globals: {}
};

export default config;
