/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    // "**/**/*.test.ts",
    // "**/**/auth.test.ts",
    "**/**/todos.test.ts",
  ],
  // detectOpenHandles: false,
};
