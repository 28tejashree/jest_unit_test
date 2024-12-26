module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  };