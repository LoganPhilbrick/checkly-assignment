## Checkly Assignment

This CLI-driven Checkly setup is ready to deploy your existing playwright checks, dynamically created api checks, and any new checks added to the respective folder.

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/username/repo.git

   ```

2. Install dependencies:
   `npm install`

3. Login to Checkly:
   `npx Checkly Login`

## Project Structure

Project/
├── **checks**/
│ ├── automation.check.ts
│ ├── automation.spec.ts
│ ├── pokemon.check.ts
│ ├── pokemon.spec.ts
├── api_checks/
│ ├── user-api.check.ts
│ ├── users.json
├── groups/
│ ├── api-group.check.ts
│ ├── browser-group.check.ts
├── alert-channel.ts
├── checkly.config.ts

## Checks Folder

The checks folder is where your playwright tests and the corresponding browser checks live. Any new tests added to the `__checks__` folder will be automatically added to the **Browser Group** upon running `npx checkly deploy`. Run `npx checkly test` to confirm your checks are being registered by the corresponding `check.ts` file.

## API-Checks Folder

There is one `check.ts` file in the `api_checks` folder. This file contains a dynamic `ApiCheck` that will iterate over the `users.json` file, located in the same folder, and create individual checks for each object in the said file. Running `npx checkly test` will display a check for each object in the `users.json` file in the command line with the browser checks. Once `npx checkly deploy` is run the new checks will be deployed to your checkly dashboard in a group with the name **API Group**

## Alert Channel

The `alert-channel.ts` file exports an `EmailAlertChannel` that is being imported and passed to the properties of the CheckGroup constructs in the `api-group.check.ts` and `browser-group.check.ts`. This adds the specified email to the **Alert channels** of both groups. Currently set to send an alert for failed checks and an alert for if a failed check is recovered.
