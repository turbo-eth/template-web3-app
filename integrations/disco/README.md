# Disco TurboETH Integration

Welcome to the "Disco" TurboETH Integration! This integration is a system designed to interact with the Disco API, enabling the extraction and display of profile information and credentials tied to a specific DID or Ethereum address.

## Features

- Fetch and display profile data from a given Ethereum address or DID through the Disco API.
- Fetch and display the credentials of a DID.
- Custom hooks that interact with the Disco API to fetch and manage the profile and credential data.

## API

### Routes

- `route-credentials-from-did.ts`: Fetches the credentials associated with a specific DID from the Disco API.
- `route-disco-profile-from-address.ts`: Fetches the profile associated with a specific Ethereum address from the Disco API.
- `route-disco-profile-from-did.ts`: Fetches the profile associated with a specific DID from the Disco API.

## Components

- `disco-profile-basic.tsx`: A component that displays the basic profile information (name, avatar, bio) of a DID or Ethereum address.
- `disco-profile-credentials.tsx`: A component that displays the credentials associated with a DID.

## Hooks

- `use-disco-get-credentials-from-did.ts`: A hook that fetches the credentials of a DID from the Disco API.
- `use-disco-get-profile-from-address.ts`: A hook that fetches the profile of an Ethereum address from the Disco API.
- `use-disco-get-profile-from-did.ts`: A hook that fetches the profile of a DID from the Disco API.

## Routes

Routes define the client-side requests to fetch data from the Disco API.

- `get-credentials-from-did`: Fetches the credentials of a DID.
- `get-profile-from-address`: Fetches the profile of an Ethereum address.
- `get-profile-from-address-simple`: A simplified version of fetching the profile from an Ethereum address.
- `get-profile-from-did`: Fetches the profile of a DID.

## File Structure

```
integrations/disco
├─ api/
│  ├─ route-credentials-from-did.ts
│  ├─ route-disco-profile-from-address.ts
│  ├─ route-disco-profile-from-did.ts
├─ components/
│  ├─ disco-profile-basic.tsx
│  ├─ disco-profile-credentials.tsx
├─ hooks/
│  ├─ use-disco-get-credentials-from-did.ts
│  ├─ use-disco-get-profile-from-address.ts
│  ├─ use-disco-get-profile-from-did.ts
├─ routes/
│  ├─ get-credentials-from-did/
│  │  ├─ client.ts
│  │  ├─ index.ts
│  ├─ get-profile-from-address/
│  │  ├─ client.ts
│  │  ├─ index.ts
│  ├─ get-profile-from-address-simple/
│  │  ├─ client.ts
│  │  ├─ index.ts
│  ├─ get-profile-from-did/
│  │  ├─ client.ts
│  │  ├─ index.ts
├─ disco-client.ts
├─ README.md
```