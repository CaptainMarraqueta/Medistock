import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Cobertura
  collectCoverage: true,
  coverageDirectory: "coverage",

  coverageReporters: [
    "text",
    "html",
    "lcov",
  ],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.ts",
    "!src/**/*.spec.ts",
    "!src/**/*.d.ts",
  ],

  // Reportes
  reporters: [
    "default",
  ],

  // Más detalle en consola
  verbose: true,
};

export default config;