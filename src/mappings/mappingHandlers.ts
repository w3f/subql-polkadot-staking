import { SubstrateExtrinsic } from "@subql/types";
import { Extrinsic, FunctionArgument, SilField } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import { Text, Compact, u32 } from "@polkadot/types-codec";

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    // Extract info about the extrinsic via the metadata.
    const meta = extrinsic.extrinsic.meta;
    const header = extrinsic.block.block.header;

    // Init extrinsic.
    const block_nr = header.number.toNumber();
    const index = extrinsic.idx;
    const id = `${block_nr}-${index}`;

    const e = new Extrinsic(id);
    e.block_hash = header.hash.toString();
    e.block_nr = block_nr;
    e.timestamp = extrinsic.block.timestamp.toISOString();
    e.signer = extrinsic.extrinsic.signer.toString();
    e.index = index;

    // Name of the extrinsic
    e.name = (meta.name as Text).toHuman();
    e.call_index = meta.index.toNumber();
    e.docs = (meta.docs as Array<Text>).map((t) => { return t.toString(); });

    // Call data.
    const raw = extrinsic.extrinsic.data;
    if (raw.length > 1) { // [0] = empty
        const data = Buffer.from(raw).toString("hex");
        e.call_data = data;
    }

    await e.save();

    // Map fields
    var counter = 0;
    for (let item of meta.fields) {
        const field = new SilField(`${id}-silfield-${counter}`);

        if (item.name.isSome) {
            field.name = (item.name.value as Text).toString();
        }
        field.type = (item.type as Compact<u32>).toNumber();
        if (item.typeName.isSome) {
            field.typeName = (item.typeName.value as Text).toString();
        }
        field.docs = (item.docs as Array<Text>).map((t) => { return t.toString(); });

        // Push to storage, track Id.
        field.extrinsicId = id;
        await field.save();
        counter += 1;
    }

    // Map function arguments.
    var counter = 0;
    for (let item of meta.args) {
        const arg = new FunctionArgument(`${id}-func-arg-${counter}`);

        arg.name = (item.name as Text).toString();
        arg.type = (item.type as Text).toString();
        if (item.typeName.isSome) {
            arg.typeName = (item.typeName.value as Text).toString();
        }

        // Push to storage, track Id.
        arg.extrinsicId = id;
        await arg.save();
        counter += 1;
    }
}
