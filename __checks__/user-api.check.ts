import { ApiCheck, AssertionBuilder } from "checkly/constructs";
import data from "../users.json";
import "dotenv/config";

const { authToken } = process.env;

const users = data.users;

for (const user of users) {
  new ApiCheck(`User_${user.id}_check`, {
    name: `${user.name}(${user.id}) Check`,
    request: {
      url: `${user.profile_url}`,
      method: "GET",
      followRedirects: true,
      skipSSL: false,
      headers: [{ key: "Authorization", value: `Bearer ${authToken}` }],
      assertions: [AssertionBuilder.statusCode().equals(200)],
    },
  });
}
