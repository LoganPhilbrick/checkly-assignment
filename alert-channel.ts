import { EmailAlertChannel } from "checkly/constructs";

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: false,
};

export const emailChannel = new EmailAlertChannel("email-channel-1", {
  address: "raccoon@checklyhq.com",
  ...sendDefaults,
});
