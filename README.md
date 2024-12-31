
## Checkly Assignment

This CLI-driven Checkly setup is ready to deploy your existing playwright checks, dynamically created api checks, and any new checks added to the respective folder.

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/LoganPhilbrick/checkly-assignment.git

   ```

2. Install dependencies:
   ```bash
   npm install

   ```

4. Login to Checkly:
   ```bash
   npx Checkly Login

   ```

## Project Structure

```
Project/
├── __checks__/
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
```

## `__checks__` Folder

Existing playwright tests and corresponding [BrowserChecks](https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck) live inside `__checks__`.
Future tests should be added here as `spec.ts` files along with corresponding BrowserChecks in `check.ts` files.

## `api_checks` Folder

The `api_checks` folder contains `user-api.check.ts` and `users.json`.
`user-api.check.ts` contains a dynamic [ApiCheck](https://www.checklyhq.com/docs/cli/constructs-reference/#apicheck) which iterates over `users.json`.
Adding new objects to the `users.json` array will create a check for each new addition.

### Environment Variables

In the `user-api.check.ts` file, the auth token is destructured from `process.env` with the name ***authToken***. Locally this can be stored in a `.env` file. 

After deployment:

- To prevent api checks from failing due to lack of credentials, make sure you add your auth token to your [Environment Variables](https://app.checklyhq.com/environment-variables) in your Checkly dashboard as an ***Environment Secret*** to keep this key secure.
- If you wish to save it under a different name, remember to update the destructured variable in `user-api.check.ts` to match the new key that the token is saved as.
- The token is passed to the headers of the ***ApiCheck*** as ``value: `Bearer ${authToken}` `` so, when you save your token to your Environment Variables, only include the alphanumeric key.

### [Assertions](https://www.checklyhq.com/docs/api-checks/assertions/)

Three [AssertionBuilders](https://www.checklyhq.com/docs/cli/constructs-reference/#assertionbuilder) have been added to the assertions array in the `user-api.check.ts` file:

1. `AssertionBuilder.statusCode().equals(200)` passes if the status code is equal to `200`.

3. `AssertionBuilder.jsonBody("$.id").equals(user.id)` passes if the id returned in the response body of the api check matches the id of the user that was passed into the check from the `users.json` file.

5. `AssertionBuilder.jsonBody("$.name").equals(user.name)` passes if the name returned in the response body of the api check matches the name of the user that was passed into the check from the `users.json` file.

## Groups

[Group](https://www.checklyhq.com/docs/groups/) configurations are located in their respective files within the `groups` folder.
To start, `api-group.check.ts` and `browser-group.check.ts` have already been added.
Alter properties like 'frequency' and 'locations' in the [CheckGroup](https://www.checklyhq.com/docs/cli/constructs-reference/#checkgroup) constructs.

When adding new browser checks:

- Remember to add `group: browserGroup,` to the properties of new BrowserCheck's so they are added to the browser group.
- Newly created checks will be stored in the specified groups upon deployment.
 
## Alert Channel

The `alert-channel.ts` file exports an [EmailAlertChannel](https://www.checklyhq.com/docs/cli/constructs-reference/#emailalertchannel) that is imported to the `api-group.check.ts` and `browser-group.check.ts` and passed to the properties of the CheckGroup constructs.
Specified email has been set to receive notifications for failed and recovered checks. Email can be changed in the properties of the exported `emailChannel`.

## Testing

To test your checks, run:

 ```bash
 npx checkly test

 ```

This will display all checks in the terminal. Here you can see if a check is passing or failing. You can also use this to verify if any checks are not being read properly.

## Deploying to Checkly

Once you have verified all checks are passing and are ready to deploy to Checkly, run:

```bash

npx checkly deploy
```

All checks will deploy to your Checkly dashboard in the corresponding group.

