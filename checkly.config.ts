import { defineConfig } from "checkly";

const config = defineConfig({
  projectName: "Checkly Assignment",
  logicalId: "checkly-assignment",
  checks: {
    locations: ["us-east-1", "eu-west-1"],
    runtimeId: "2024.02",
    checkMatch: ["**/api_checks/**/*.check.ts", "**/__checks__/**/*.check.ts"],
    playwrightConfig: {},
  },
  cli: {
    runLocation: "us-east-1",
    retries: 0,
  },
});

export default config;
