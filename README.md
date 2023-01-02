[![CircleCI](https://circleci.com/gh/w3f/subql-polkadot-staking.svg?style=svg)](https://circleci.com/gh/w3f/subql-polkadot-staking)

# SubQuery - Polkadot Staking


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
        signer
        module
        method
        blockHash
        blockNr
        timestamp
        parameters{
          nodes{
            name
            type
            typeName
            typeName2
            value
          }
        }
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
        module
        method
        blockHash
        blockNr
        timestamp
        parameters{
          nodes{
            name
            type
            typeName
            typeName2
            value
          }
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
    batchCalls(
      last:1
      filter: {
        method: {includes: "bond"}
      }
    ){
      nodes {
        id
        signer
        blockNr
        blockHash
        module
        method
        parentCallId
        parameters{
          nodes{
            id
            name
            value
          }
        }
      }
    }
  }
}
```test
