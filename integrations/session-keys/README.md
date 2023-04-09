# Browser Session Keys - TurboETH Integration

This React Hook allows you to add, get, and manage Ethereum private keys in a browser session using IndexedDB as storage. The user's session keys can be given temporary smart contract permissions via the [delegatable](https://delegatable.org/) framework and/or temporary write/read access to [Ceramic network](https://ceramic.network/) data streams.

## Features
- Retrieve an array of all session keys stored in IndexedDB
- Create a new Ethereum private key and save it to IndexedDB
- Delete a specific Ethereum private key from IndexedDB
- Delete all Ethereum private keys from IndexedDB
- Retrieve a Viem account corresponding to a specific Ethereum private key stored in IndexedDB


## API
`sessionKeys`
An array of session keys from IndexedDB. Any changes to the session keys in IndexedDB will be reflected in the sessionKeys array automatically, thanks to Dexie's live query.

`createSessionKey()`
Creates a new Ethereum private key using the [viem](https://viem.sh/) library, saves it to IndexedDB with [Dexie.js](https://dexie.org/), and returns the newly created session key object containing the session key's address and private.

**Error Handling:**
- Throws an error if the session key is already saved or if it is not a valid private key.


`deleteSessionKey(address)`
Deletes a session key from IndexedDB using the given Ethereum address.

**Error Handling:**
- Throws an error if the session key does not exist or it is not a valid private key.


`deleteAllSessionKeys()`
Deletes all session keys from IndexedDB.


`getSessionAccount(address)`
Retrieves a Viem account corresponding to a specific Ethereum private key stored in IndexedDB using the given Ethereum address.
**Error Handling:**
- Throws an error if the session key does not exist or if the session key is not a valid private key.

## File Structure
```
integrations/session-keys
├─ components/
│  ├─ create-session-key.tsx
│  ├─ delete-all-session-keys.tsx
│  ├─ delete-session-key.tsx
│  ├─ list-session-keys.tsx
├─ hooks/
│  ├─ use-session-key.ts
├─ database.ts
├─ README.md
```