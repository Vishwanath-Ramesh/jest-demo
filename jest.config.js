module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Setting the test environment to node. i.e., window/DOM object is not accessible
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'), // If you are importing the React component which in turn imports css files internally, jest throws Sytax error. For that, we need resolve to mock module.
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './test/setupTests.js'], // Imports the supplied files in all the test suites
  collectCoverageFrom: ['**/src/**/*.js'], // To cover all the files inside the src folder while generating the test report
  coverageThreshold: {
    //Setting the threshold levels for the different test results to meet.
    // global: {
    //   // Setting the threshold levels globally
    //   statements: 34,
    //   branches: 24,
    //   functions: 29,
    //   lines: 29,
    // },
    // './src/matchSnapshot.js': {
    //   // Setting the threshold levels for a specific file
    //   statements: 100,
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    // },
  },
}
