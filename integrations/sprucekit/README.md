# SpruceKit - TurboETH Integration

Welcome to the [SpruceKit](https://sprucekit.dev/) TurboETH Integration! This integration provides a secure and straightforward method for users to authenticate themselves using their Ethereum wallets.

## Features

- Secure user authentication via their Ethereum wallet.
- Sign-In with Ethereum (SIWE) login and logout functionality.
- Displaying user's account details post-authentication.
- React components to handle various authentication states.

## API

### Actions

`spruceKitLogin()`
Initiates the SSX login process, creating and signing a SIWE message and then verifying it through a backend service.

`spruceKitLogout()`
Finalize the SSX session and logs out the user by sending a request to the backend logout service.

### Components

`BranchButtonLoginOrAccount()`
Renders either a login or logout button and a link to the user's account depending on whether the user is authenticated or not.

`IsSignedInd()`
A React component that conditionally renders its children if the user is signed in.

`IsSignedOut()`
A React component that conditionally renders its children if the user is signed out.

`ButtonSpruceKitLogin()`
A button that initiates the SSX login process when clicked.

`ButtonSpruceKitLogout()`
A button that initiates the SSX logout process when clicked.

## File Structure

```
integrations/sprucekit
├─ actions/
│  ├─ spruceki-login.ts
│  ├─ sprucekit-logout.ts
├─ api/
│  ├─ _ssx.ts
│  ├─ index.ts
│  ├─ login.ts
│  ├─ logout.ts
│  ├─ nonce.ts
│  ├─ verify.ts
├─ components/
│  ├─ branch-button-login-or-account.tsx
│  ├─ button-sprucekit-login.tsx
│  ├─ button-sprucekit-logout.tsx
│  ├─ is-signed-in.tsx
│  ├─ is-signed-out.tsx
├─ README.md
```
