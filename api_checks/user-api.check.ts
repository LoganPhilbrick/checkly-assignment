import { ApiCheck, AssertionBuilder } from "checkly/constructs";
import { emailChannel } from "../alert-channel";
import apiGroup from "../groups/api-group.check";
import data from "./users.json";
import "dotenv/config";

const { authToken } = process.env;

const users = data.users;

for (const user of users) {
  new ApiCheck(`User_${user.id}_check`, {
    name: `${user.name}(${user.id}) Check`,
    alertChannels: [emailChannel],
    group: apiGroup,
    request: {
      url: `${user.profile_url}`,
      method: "GET",
      followRedirects: true,
      skipSSL: false,
      headers: [{ key: "Authorization", value: `Bearer ${authToken}` }],
      assertions: [AssertionBuilder.statusCode().equals(200), AssertionBuilder.jsonBody("$.id").equals(user.id), AssertionBuilder.jsonBody("$.name").equals(user.name)],
    },
  });
}
