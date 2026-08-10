![image](https://user-images.githubusercontent.com/3408362/230732083-1c98e451-08af-41c2-b522-126370e8c6a5.png)

# ⚡ TurboETH - Web3 App Starter Kit

![CI](https://github.com/turbo-eth/template-web3-app/actions/workflows/ci.yml/badge.svg)
![TS](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

Web3 App Template built using Next.js, RainbowKit, Tailwind, Sign-In With Ethereum, and more.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app&project-name=TurboETH&repository-name=turbo-eth&demo-title=TurboETH&env=NEXTAUTH_SECRET,DATABASE_URL&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app%2Fblob%integrations%2F.env.example)

### [Documentation](https://docs.turboeth.xyz)

- Getting Started
  - [Environment Variables](https://docs.turboeth.xyz/getting-started/environment)
  - [JSON-RPC](https://docs.turboeth.xyz/getting-started/json-rpc)
  - [WAGMI CLI](https://docs.turboeth.xyz/getting-started/wagmi-cli)
  - [UI Components](https://docs.turboeth.xyz/getting-started/design-system)
  - [Backend Database](https://docs.turboeth.xyz/getting-started/database)
- Core Integrations
  - [🌈 RainbowKit](https://docs.turboeth.xyz/integration/rainbowkit)
  - [🔏 Sign-In With Ethereum](https://docs.turboeth.xyz/integration/sign-in-with-ethereum)
- Smart Contract Integrations
  - [ERC20](https://docs.turboeth.xyz/integration/smart-contract-erc20)
- API Integrations
  - [Disco](https://docs.turboeth.xyz/integration/disco)
  - [Etherscan](https://docs.turboeth.xyz/integration/etherscan)

# Getting Started

The `pnpm` CLI is the recommended package manager but `npm` and `yarn` should work too.

```bash
pnpm install
```

#### Development

```bash
pnpm dev
```

#### Build

```bash
pnpm build
```

### Web3 Core

- [WAGMI CLI](https://wagmi.sh/cli/getting-started) - Automatic React Hook Generation
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection manager
- [Sign-In With Ethereum](https://login.xyz/) - Account authentication

### Web2 Frameworks

- [Vercel](https://vercel.com/) - App Infrastructure
- [Prisma](https://www.prisma.io/) - Database ORM

# IPFS Storage

This template includes an optional IPFS storage provider using [IPFS Pay-to-Pin](https://github.com/IcanBENCHurCAT/ipfs-pay-to-pin) — a pay-as-you-go alternative to Pinata and Infura.

### Why Pay-to-Pin?

- **No monthly subscriptions** — pay only for what you pin
- **Native USDC** — micro-payments on Algorand (sub-cent fees, instant settlement)
- **x402 machine-readable payments** — perfect for AI agents and programmatic workflows
- **Zero vendor lock-in** — open-source SDK, fully self-custodial

### Usage

```typescript
import { uploadToPayToPin } from "@/integrations/paytopin"

const file = new File(["hello world"], "hello.txt")
const result = await uploadToPayToPin(file)
console.log("Pinned:", result.cid)
console.log("Gateway:", result.gatewayUrl)
```

### Setup

Add the following to your `.env.local`:

```bash
IPFS_PAY_TO_PIN_MNEMONIC=<your-algorand-mnemonic>
IPFS_PAY_TO_PIN_GATEWAY_URL=https://pay-to-pin.duckdns.org
IPFS_PAY_TO_PIN_NETWORK=mainnet
```

Generate an Algorand mnemonic at [https://algorand.wtf/generator](https://algorand.wtf/generator) — you can fund a testnet account for development.

---


### Developer Experience

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### User Interface

- [TailwindCSS](https://tailwindcss.com) – Utility-first CSS framework for rapid UI development
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience
- [Framer Motion](https://www.framer.com/motion/) – Motion library for React to animate components with ease
- [React Icons](https://react-icons.github.io/react-icons) – Beautifully simple, pixel-perfect icons

The [ui.shadcn.com](https://ui.shadcn.com) components are included in the `/components/shared/ui` folder.

# 💻 Developer Experience

### 🐕 What is husky

Husky improves your git commits.

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.

#### 🪝 Hooks

- pre-commit: lint app codebase
- commit-msg: apply commintlint

### 📋 What is commitlint

commitlint checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

Real world examples can look like this:

```
chore: run tests on travis ci
```

```
fix(server): send cors headers
```

```
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

# Acknowledgements

Original template was forked from https://github.com/wslyvh/nexth

Thank you @wslyvh 🙏

<hr/>

Copyright 2023 [Kames Geraghty](https://twitter.com/KamesGeraghty)
