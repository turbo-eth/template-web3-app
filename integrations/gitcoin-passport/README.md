# Dev guide

### Env variables

You need to provide two env variables in order to use this integration:

`GITCOIN_PASSPORT_API_KEY` and `GITCOIN_PASSPORT_SCORER_ID`

# Getting Access: Scorer ID and API Key

The Passport API provides programmatic access to a wallet's Passport score. Once you have your API key, you need to include it with each request you make to the API. This allows Gitcoin to identify your app and verify that you are authorized to access the API.

### Getting Your API Key

1. **Log in to the developer portal:** Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. **Navigate to the API Keys section:** After logging in, go to the "API Keys" section.
3. **Generate an API key:** Click on the "+ Create a Key" button to generate a unique API key for your account.
4. **Store your API key securely:** Store your API key in a secure place, as it will be used to access the Passport API.

### Scorers and Scorer ID

A Scorer is an individual object with a unique ID that is associated with your account. If you are using the Gitcoin Passport API in multiple applications, you can set up separate communities for each one. This allows you to customize the scoring rules for each application and deduplicate any identical Passport VCs that are submitted to the same application.

By using communities, you can manage specific parameter settings and log traffic for your Passport-enabled applications. This can help you ensure that the identity verification functionality is working correctly and meets the needs of your stakeholders.

#### Getting your Scorer ID

1. **Log in to the Developer Portal:** Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. **Navigate to the Communities section:** After logging in, go to the "Communities" section
3. **Create a Scorer:** Click on the "+ Create a Scorer" button and input a Scorer name and description.
4. **Find your Scorer ID:** Click on the newly created Scorer and you will see the Scorer ID in the page URL.\
   Example: `https://www.scorer.gitcoin.co/dashboard/scorer/scorer_id`

## File Structure

```
integrations/gitcoin-passport
├─ api/
│  ├─ address-score.ts
│  ├─ address-stamps.ts
│  ├─ signing-message.ts
│  ├─ stamps-metadata.ts
│  ├─ submit-passport.ts
├─ components/
│  ├─ list-stamps.tsx
│  ├─ score-gate.tsx
│  ├─ stamp-card.tsx
│  ├─ stamp-gate.tsx
│  ├─ submit-passport-button.tsx
├─ hooks/
│  ├─ use-get-address-stamps.ts
│  ├─ use-get-score.ts
│  ├─ use-get-stamps-metadata.ts
│  ├─ use-submit-passport.ts
├─ utils/
│  ├─ config.ts
│  ├─ data-types.ts
│  ├─ types.ts
├─ constants.ts
├─ types.ts
├─ README.md
```
