import { Extrinsic, BatchCall } from "../types";
import { SubstrateExtrinsic } from '@subql/types';

function setCommonValues(entity: Extrinsic | BatchCall, extrinsic: SubstrateExtrinsic): void {
    const header = extrinsic.block.block.header;
    entity.signer = extrinsic.extrinsic.signer.toString();
    entity.block_hash = header.hash.toString();
    entity.block_nr = header.number.toNumber();
    entity.timestamp = extrinsic.block.timestamp.toISOString();
}

function generateId(extrinsic: SubstrateExtrinsic): string {
    const header = extrinsic.block.block.header;
    const block_nr = header.number.toNumber();
    const index = extrinsic.idx;
    return `${block_nr}-${index}`;
}

export function makeExtrinsic(extrinsic: SubstrateExtrinsic): Extrinsic {
    const entity = new Extrinsic(generateId(extrinsic));
    setCommonValues(entity,extrinsic)
    return entity
}

export function makeBatchCall(idPrefix: string, idIndex: string, extrinsic: SubstrateExtrinsic, ): BatchCall {
    const entity = new BatchCall(`${idPrefix}-${idIndex}`);
    setCommonValues(entity,extrinsic)
    return entity
}