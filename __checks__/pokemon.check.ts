import { BrowserCheck } from "checkly/constructs";
import * as path from "path";
import browserGroup from "../groups/browser-group.check";

new BrowserCheck("pokemon-check", {
  name: "Pokemon Check",
  frequency: 30,
  group: browserGroup,
  locations: ["us-east-1", "eu-west-1"],
  code: {
    entrypoint: path.join(__dirname, "pokemon.spec.ts"),
  },
});
