import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
        expand: true,
      },
    ],
  ],

  verbose: true,
};

export default config;