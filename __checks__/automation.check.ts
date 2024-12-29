import { BrowserCheck } from "checkly/constructs";
import * as path from "path";
import browserGroup from "../groups/browser-group.check";

new BrowserCheck("pokemon-check", {
  name: "Automation Check",
  frequency: 30,
  group: browserGroup,
  locations: ["us-east-1", "eu-west-1"],
  code: {
    entrypoint: path.join(__dirname, "automation.spec.ts"),
  },
});