//https://github.com/subquery/tutorials-entity-relations/blob/main/src/mappings/AccountTransfers.ts
import { SubstrateExtrinsic } from '@subql/types';
import { Account } from '../types/models/Account';
import { SetController } from '../types/models/SetController';

async function ensureAccounts(accountIds: string[]): Promise<void> {
    for (const accountId of accountIds) {
        const account = await Account.get(accountId);
        if (!account) {
            await new Account(accountId).save();
        }
    }
}

export async function handleSetController(extrinsic: SubstrateExtrinsic): Promise<void> {
    console.log(extrinsic)
    const {
        extrinsic: {
            signer: id,
            args: args,
        },
    } = extrinsic;
    var controller = args.toString();
    // set_bond calls return 3 arguments... let's strip them away
    if (controller.includes(",")) {
        controller = controller.split(",")[0];
    }
    const setController = new SetController(
        `${extrinsic.block.block.header.number.toNumber()}-${extrinsic.idx}`,
    );
    setController.stash = id.toString();
    setController.controller = controller.toString();
    await setController.save();
}