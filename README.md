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

## Docker Compose Execution

```bash
docker-compose pull && docker-compose up

#graphql exposed at localhost:3000
```

## Example Queries
```
{
  query {
    extrinsics(
      last: 5
      filter: {
        signer: { equalTo: "CaKWz5omakTK7ovp4m3koXrHyHb7NG3Nt7GENHbviByZpKp" }
      }
    ) {
      nodes {
        id
        blockHash
        blockNr
        signer
        docs
        callData
      }
    }
  }
}
```

```
{
  query {
    extrinsics {
      nodes {
        id
        signer
        blockHash
        blockNr
        timestamp
      }
    }
    silFields {
      nodes {
        id
        name
        type
        typeName
      }
    }
    functionArguments {
      nodes {
        id
        nodeId
        name
        type
        typeName
        extrinsicId
        extrinsic {
          id
          signer
          blockHash
          blockNr
          timestamp
        }
      }
    }
    stakingSlashes{
      nodes{
        balance
      }
    }
    sumRewards{
      nodes{
        rewards{
          nodes{
            balance
          }
        }
      }
    }
    stakingRewards{
      nodes{
        id
        nodeId
        accountId
        balance
      }
    }
    noBondRecordAccounts{
      nodes{
        id
      }
    }
    transfers{
      nodes{
        amount
      }
    }
  }
}
```