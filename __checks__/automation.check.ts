import { BrowserCheck, Frequency } from "checkly/constructs";
import * as path from "path";
import browserGroup from "../groups/browser-group.check";

new BrowserCheck("automation-check", {
  name: "Automation Check",
  group: browserGroup,
  locations: ["us-east-1", "eu-west-1"],
  code: {
    entrypoint: path.join(__dirname, "automation.spec.ts"),
  },
});
