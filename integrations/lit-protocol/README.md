# Lit Protocol - TurboETH Integration

This React Hook integrates with [Lit Protocol](https://litprotocol.com/), enabling users to encrypt and decrypt messages using [Threshold Cryptography](https://en.wikipedia.org/wiki/Threshold_cryptosystem). Users can define access control conditions based on on-chain data, such as specific wallet addresses, ERC20, ERC721, and ERC1155 token holders. The integration is built on top of the [Lit Protocol SDK V2](https://developer.litprotocol.com/SDK/intro).

## Features

- Encrypt messages using the Lit Protocol SDK, based access control conditions
- Store encrypted messages and metadata in a MongoDB database
- Decrypt messages securely using the Lit Protocol SDK

## API

`signAuthMessage()`
Get the authentication signature using SIWE. Returns a Promise that resolves to the signature object containing the signature, derivation method, signed message, and wallet address.

**Error Handling:**

- Throws an error if the wallet is not connected.

`encryptMessage(messageToEncrypt, accessControlConditions)`
Encrypt a message using the Lit Protocol. Returns a Promise that resolves to an object containing the encrypted message, database ID, and encrypted symmetric key.

**Error Handling:**

- Throws an error if the wallet is not connected or if the message cannot be encrypted.

`decryptMessage(id)`
Decrypt a message using the Lit Protocol given the database ID. Returns a Promise that resolves to the decrypted message or an error message if it is not possible to decrypt the message (most common erro sources: invalid Access Control Conditions provided, denied access, or error to access the Lit network).

**Error Handling:**

- Throws an error if the message cannot be decrypted or if the wallet is not connected.

## File Structure

```
integrations/lit-protocol
├─ api/
│  ├─ [id].tsx
│  ├─ encrypt.tsx
├─ components/
│  ├─ access-control/
│  │  ├─ access-control-single-address.tsx
│  │  ├─ access-control-single-erc721.tsx
│  │  ├─ access-control-token-group.tsx
│  │  ├─ index.ts
│  │  ├─ types.ts
│  ├─ form-lit-decrypt-message.tsx
│  ├─ form-lit-encrypt-message.tsx
├─ hooks/
│  ├─ use-lit-client.ts
├─ utils/
│  ├─ config.ts
│  ├─ data-types.ts
│  ├─ types.ts
├─ client.ts
├─ README.md
```
