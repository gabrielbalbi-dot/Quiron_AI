module.exports = {
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/node_modules/', '/playwright-tests/', '/cypress-tests/', '/dist/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js', // Mock CSS imports
  },
}
