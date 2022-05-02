[![CircleCI](https://circleci.com/gh/w3f/subql-polkadot-extrinsics.svg?style=svg)](https://circleci.com/gh/w3f/subql-polkadot-extrinsics)

# SubQuery - Polkadot Extrinsics


The Starter Package is an example that you can use as a starting point for developing your SubQuery project.
A SubQuery package defines which data The SubQuery will index from the Substrate blockchain, and how it will store it. 

## Dependencies

You need `yarn` and `nodejs`, then install the required packages:

```bash
yarn global add @subql/cli @subql/node @subql/query
```

## Building

```bash
yarn && yarn codegen && yarn build
```

## Execution

```bash
subql-node -f .
```
