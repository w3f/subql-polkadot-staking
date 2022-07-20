//https://github.com/subquery/tutorials-entity-relations/blob/main/src/mappings/AccountTransfers.ts
import { SubstrateExtrinsic } from '@subql/types';
import { SetController } from '../types/models/SetController';

export async function handleSetController(extrinsic: SubstrateExtrinsic): Promise<void> {
    const {
        extrinsic: {
            signer: id,
            args: args,
        },
    } = extrinsic;
    let controller = args.toString();
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