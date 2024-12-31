import { CheckGroup, Frequency } from "checkly/constructs";
import { emailChannel } from "../alert-channel";

const browserGroup = new CheckGroup("browser-group", {
  name: "Browser Group",
  alertChannels: [emailChannel],
  activated: true,
  locations: ["us-east-1", "eu-west-1"],
  tags: ["browser-group"],
  concurrency: 10,
  browserChecks: {
    frequency: Frequency.EVERY_30M,
    testMatch: "**/__checks__/**/*.spec.ts",
  },
});

export default browserGroup;
