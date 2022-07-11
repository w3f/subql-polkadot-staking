//https://github.com/subquery/tutorials-entity-relations/blob/main/src/mappings/Calls.ts
import { SubstrateExtrinsic } from '@subql/types';
import { BatchCall } from '../types/models/BatchCall';
import { Vec } from '@polkadot/types';
import { AnyTuple, CallBase } from '@polkadot/types/types';
import { BatchParameter } from '../types';
import { makeBatchCall } from './utils';

async function extractBatchCalls(
    idPrefix: string,
    idIndex: string,
    extrinsic: SubstrateExtrinsic,
    call: CallBase<AnyTuple>,
    parentCallId: string,
): Promise<void> {
    const entity: BatchCall = makeBatchCall(idPrefix,idIndex,extrinsic) //has to be dynamic => blocknumber - extrinsic index - call index
    entity.method = call.method;
    entity.module = call.section;
    entity.parentCallId = parentCallId;
    await entity.save()

     // Map Parameters fields
     for (const [i,item] of call.args.entries()) {
        const p = new BatchParameter(`${entity.id}-parameter-${i}`)
        p.batchCallId = entity.id
        p.value = item.toString()
        p.name = call.meta.fields[i].name.toString()
        
        await p.save();
    }

    
    if ( (call.method == 'batchAll' || call.method == 'batch')  && call.section == 'utility') {
        const calls = call.args[0] as Vec<CallBase<AnyTuple>>;
        for (const [i,call] of calls.entries()){
            await extractBatchCalls(entity.id, i.toString(), extrinsic, call, entity.id)
        }
    } else {
        return;
    }
}

export async function handleBatchCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    await extractBatchCalls(
        extrinsic.block.block.header.number.toString(),
        extrinsic.idx.toString(),
        extrinsic,
        extrinsic.extrinsic.method,
        null, //first iteration there is no parent
    );
}