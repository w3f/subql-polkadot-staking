import "@polkadot/api-augment"
//Exports all handler functions
export * from './mappings/Extrinsics'
//Rewards and Staking
export * from "./mappings/Reward";
export * from "./mappings/Staking";
export * from "./mappings/SetController";
//Transfers and BatchCalls
export * from "./mappings/AccountTransfers";
export * from "./mappings/BatchCalls";