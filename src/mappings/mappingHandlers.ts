import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const e = extrinsic.extrinsic;
    logger.debug("---");
    logger.debug(`toHuman: ${e.toHuman()}`);
    logger.debug(`toJson: ${e.toJSON()}`);
    logger.debug(`toString: ${e.toString()}`);
    logger.debug(`inspect.name: ${e.inspect().name}`);
    logger.debug(`method: ${e.method}`);
    logger.debug(`meta: ${e.meta}`);
}


