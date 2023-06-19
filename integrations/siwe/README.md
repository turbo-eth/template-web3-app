# Sign-In with Ethereum - TurboETH Integration

Welcome to the [Sign-In with Ethereum](https://login.xyz/) TurboETH Integration! This integration provides a secure and straightforward method for users to authenticate themselves using their Ethereum wallets.

## Features

- Secure user authentication via their Ethereum wallet.
- Sign-In with Ethereum (SIWE) login and logout functionality.
- Displaying user's account details post-authentication.
- React components to handle various authentication states.

## API

### Actions

`siweLogin()`
Initiates the SIWE login process, creating and signing a SIWE message and then verifying it through a backend service.

`siweLogout()`
Logs out the user by sending a request to the backend logout service.

`siweMessage()`
Creates a SIWE message to be signed by the user's Ethereum wallet, and returns this message along with its signature.

### Components

`BranchButtonLoginOrAccount()`
Renders either a login or logout button and a link to the user's account depending on whether the user is authenticated or not.

`IsSignedInd()`
A React component that conditionally renders its children if the user is signed in.

`IsSignedOut()`
A React component that conditionally renders its children if the user is signed out.

`ButtonSIWELogin()`
A button that initiates the SIWE login process when clicked.

`ButtonSIWELogout()`
A button that initiates the SIWE logout process when clicked.

## File Structure

```
integrations/siwe
├─ actions/
│  ├─ siwe-login.ts
│  ├─ siwe-logout.ts
│  ├─ siwe-message.ts
├─ api/
│  ├─ index.ts
│  ├─ logout.ts
│  ├─ nonce.ts
│  ├─ verify.ts
├─ components/
│  ├─ branch-button-login-or-account.tsx
│  ├─ button-siwe-login.tsx
│  ├─ button-siwe-logout.tsx
│  ├─ is-signed-in.tsx
│  ├─ is-signed-out.tsx
├─ README.md
```
