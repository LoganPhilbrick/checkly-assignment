import { CheckGroup } from "checkly/constructs";
import { emailChannel } from "../alert-channel";

const apiGroup = new CheckGroup("api-group", {
  name: "API Group",
  activated: true,
  frequency: 5,
  alertChannels: [emailChannel],
  locations: ["us-east-1", "eu-west-1"],
  tags: ["api-group"],
  concurrency: 10,
});

export default apiGroup;
