# ⚡ TurboETH Web3 App Template
Build Web3 In Turbo Mode

[Demo](https://turboeth.xyz) | [Deploy](https://deploy.turboeth.xyz)


# Getting Started

```bash
pnpm install
```

#### Development
```bash
pnpm dev
```

#### Build
```bash
pnpm dev
```

## WAGMI CLI

TurboETH includes support for [`@wagmi/cli`](https://wagmi.sh/cli/getting-started) to automatically generate hooks and other boilerplate.

#### Init
```bash
pnpm wagmi:init
```

#### Generate
```bash
pnpm wagmi:generate
```

### Web3 Frameworks
- RainbowKit - Wallet connection manager
- [Sign-In With Ethereum](https://login.xyz/) - Account authentication
- [Disco](https://docs.disco.xyz/) - Web3 identity simplified 
- [Etherscan](https://docs.etherscan.io) - Blockchain metadata 

### Web3 Developer Experience
- [WAGMI CLI](https://wagmi.sh/cli/getting-started) - Automatic React Hook Generation

### Web2 Frameworks
- Vercel - App Infrastructure
- Prisma - Database ORM 

### Developer Experience
- TypeScript – Static type checker for end-to-end typesafety
- Prettier – Opinionated code formatter for consistent code style
- ESLint – Pluggable linter for Next.js and TypeScript

### User Interface
- Tailwind CSS – Utility-first CSS framework for rapid UI development
- Radix – Primitives like modal, popover, etc. to build a stellar user experience
- Framer Motion – Motion library for React to animate components with ease
- Lucide – Beautifully simple, pixel-perfect icons

# 🏗️ Setup
The TurboETH build system currently supports several Web3 integrations:

- [Sign-In With Ethereum](https://login.xyz/)
- [Disco Data Backpack](https://docs.disco.xyz/)
- [Etherscan](https://docs.etherscan.io)

Have a suggestion? Open a ticket!

## Sign-In With Ethereum

More information coming soon...

## Disco Data Backpack

More information coming soon...

## Etherscan
Etherscan API services are integrated in `/pages/api/etherscan` and `/lib/services/etherscan` folder.

More information coming soon...

# Application Database

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started

2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.

3. Run `prisma db pull` to turn your database schema into a Prisma schema.

4. Run `prisma generate` to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=nexth&filter=next.js&utm_source=nexth&utm_campaign=nexth-readme) from the creators of Next.js.

https://deploy.turboeth.xyz

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Sponsors

The TurboETH Web3 Build System is sponsored and maintained by District Labs.

<a alt="District Labs" href="https://districtlabs.com/" target="_blank">
 <img src="https://red-effective-snake-988.mypinata.cloud/ipfs/QmXhSGcjL9oqQUpoSLzJ1vWto4B43epATpraqJhV5B4cdB">
</a>

Interested in sponsoring the development and maintenance of the `TurboETH - Web3 Build System` templates, utilities and modules?

Contact us today at <a alt="District Labs" href="https://districtlabs.com/" target="_blank">District Labs</a> or collect (coming soon) the TurboETH Mirror Collection.

# Acknowledgements

Original template was forked from https://github.com/wslyvh/nexth

Underlying wallet manage and design systems were changed, but the template is continuing to use the original folder structure, plus other developer experience optimizations.

Thank you @wslyvh 🙏

The Precedent design system was absorbed (https://github.com/steven-tey/precedent) into TurboETH. 

Muchas gracies @steven-tey 🙏

# Why TurboETH? Hybrid Applications!
TurboETH blends traditional Web2 application technologies with cutting-edge Web3 cryptographic primitives. 

Why? So developers can start building next-generation applications today.

<img width="420px" src="https://user-images.githubusercontent.com/3408362/212877207-58a9b8c3-937b-4048-a1d4-5a2f79c977ff.png" />

https://twitter.com/ryanberckmans/status/1613947275625074696

<hr/>

Copyright 2022 [Kames Geraghty](https://twitter.com/KamesGeraghty)
