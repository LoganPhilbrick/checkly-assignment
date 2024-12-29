import { CheckGroup } from "checkly/constructs";
import { emailChannel } from "../alert-channel";

const browserGroup = new CheckGroup("browser-group", {
  name: "Browser Group",
  alertChannels: [emailChannel],
  activated: true,
  frequency: 5,
  locations: ["us-east-1", "eu-west-1"],
  tags: ["browser-group"],
  concurrency: 10,
  browserChecks: {
    frequency: 5,
    testMatch: "**/__checks__/**/*.spec.ts",
  },
});

export default browserGroup;
