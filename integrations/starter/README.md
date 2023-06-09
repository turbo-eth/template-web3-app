# Starter TurboETH Integration

Welcome to the Starter TurboETH Integration! This folder serves as a blueprint for creating new integrations in TurboETH. If you're looking to contribute a new integration, simply copy this directory, and also the starter page located at `app/integration/starter`, to begin your development.

## Creating a new integration

Below are the steps to create a new integration.

1. Copy the integration folder template from `/integrations/starter` and add your integration code, adhering to the file structure patterns evident in this folder.

2. Duplicate the integration page from `/app/(general)/integration/starter` and populate it with your integration pages' code.

3. Locate any API endpoints associated with your integration in the `/api` folder within the page folder of your integration. An example API endpoint can be found at `/app/(general)/integration/starter/api/hello-world/route.ts`. These API endpoints should follow the new [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) patterns of Next.js 13.

4. Enter the data related to your integration in `/data/turbo-integrations.ts`. Here, add a new object with the name, description, image, and URL of your integration.

5. Update the OG image configuration of your integration page in the `opengraph-image.tsx` file. Do this by replacing the argument of the `IntegrationOgImage` function with the object key of your integration used in the previous step.


## Understanding the Starter template

Each component of the Starter TurboETH template is designed to help streamline your development process:

- **abis/**: Put your contract's ABI here. Each ABI should be in its own TypeScript file.

- **client/**: Any client initialization for your chosen module or SDK should be placed here.

- **components/**: This is the home for your React components. 'Read' components, which display data from a contract, and 'write' components, that send transactions, should all be placed here.

- **hooks/**: Place your custom React hooks in this folder. These hooks are intended to manage state updates and encapsulate the logic for interacting with Ethereum contracts.

- **starter-wagmi.ts**: This is a generated file from [wagmi-cli](https://wagmi.sh/cli/getting-started). It includes hooks for your contracts .

- **index.ts**: Consider this as the entry point for your integration. It should export all the hooks, components, and utility functions that your integration provides.

- **wagmi.config.ts**: This file should hold the wagmi-cli configuration for your integration, which includes settings like compiler version and optimization.

- **README.md**: Here, you should document your integration. Explain its purpose, its use, and any important information a new developer or user should know. 

Each of these elements plays a crucial role in making your integration functional and accessible. 

## File Structure

```
integrations/starter
├─ abis/
│  ├─ **/*.ts
├─ components/
│  ├─ **/*.ts
├─ hooks/
│  ├─ **/*.ts
├─ client/
│  ├─ **/*.ts
├─ starter-wagmi.ts
├─ index.ts
├─ wagmi.config.ts
├─ README.md
```

By using this template, you'll create well-organized and understandable integrations that are easy for you and others to navigate. Happy coding!
