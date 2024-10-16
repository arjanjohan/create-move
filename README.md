> ⚠️ Under active development.
>
> If you find any bug, please report as [issue](https://github.com/arjanjohan/create-move/issues) or send a message in [🏗 Scaffold Move telegram community](https://t.me/+lOn2MJawQlc1YjA8)

# 🏗 create-move

CLI to create decentralized applications (dapps) using Scaffold Move.

This CLI tool helps you to install [Scaffold Move](https://github.com/arjanjohan/scaffold-move) with custom configurations and settings.

<h4 align="center">
  <a href="https://github.com/arjanjohan/scaffold-move">Scaffold Move Github</a> |
  <a href="https://scaffold-move-docs.vercel.app/">Scaffold Move Docs</a>
</h4>

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold Move, follow the steps below:

1. Install from NPM Registry and follow the CLI instructions.

```
npx create-move@latest
```
2. Initialize an Aptos account

```
yarn account
```

This command creates a new account and funds it from the faucet. The default network is Aptos testnet, to use other networks use the --network tag.

3. Deploy the test contract:

```
yarn deploy
```

4. On a second terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your Move modules using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

## Documentation

Visit our [docs](https://scaffold-move-docs.vercel.app/) to learn how to start building with Scaffold Move.