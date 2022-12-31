# TurboETH Web3 App Template
Next + Tailwind + RainbowKit + Optimized Developer UX

## Getting Started

```bash
npm run dev
# or
yarn dev
```

### Features

- [Next.js](https://nextjs.org/docs)
- [Chakra UI](https://chakra-ui.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [RainbowKit](https://www.rainbowkit.com/)
- [siwe](https://login.xyz/)
- [wagmi](https://wagmi.sh/)
- [ethers.js](https://docs.ethers.org/)

### 💻 Developer Experience

- [Husky](https://typicode.github.io/husky/#/)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [TypeScript](https://www.typescriptlang.org/)
- [eslint](https://eslint.org/) + [prettier](https://prettier.io/)

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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Sponsors & Maintainers

The TurboETH Web3 Build System development is (currently) sponsored (and maintained) by District Labs.

<a alt="District Labs" href="https://districtlabs.com/" target="_blank">
 <img src="https://red-effective-snake-988.mypinata.cloud/ipfs/QmXhSGcjL9oqQUpoSLzJ1vWto4B43epATpraqJhV5B4cdB">
</a>

Interested in sponsoring the development and maintenance of the `TurboETH - Web3 Build System` templates, utilities and modules?

Contact us today at <a alt="District Labs" href="https://districtlabs.com/" target="_blank">District Labs</a> or collect (coming soon) the TurboETH Mirror Collection.

<hr />

Copyright 2022 [Kames Geraghty](https://twitter.com/KamesGeraghty)

# Acknowledgements

Original template was forked from https://github.com/wslyvh/nexth

Underlying wallet manage and design systems were changed, but the template is continuing to use the original folder structure, plus other developer experience optimizations.

Thank you @wslyvh 🙏