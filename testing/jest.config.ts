module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['**/*.test.(ts|js)'],
};