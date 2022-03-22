import { SubstrateExtrinsic, SubstrateEvent, SubstrateBlock } from "@subql/types";
import { Extrinsic, FunctionArgument, SilField } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import { Text, Compact, u32 } from "@polkadot/types-codec";

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const e = new Extrinsic("");
    // Extract info about the extrinsic via the metadata.
    const meta = extrinsic.extrinsic.meta;

    e.name = (meta.name as Text).toHuman();

    // Map fields
    var ids = new Array();
    for (let item of meta.fields) {
        const field = new SilField("");

        if (item.name.isSome) {
            field.name = (item.name.value as Text).toString();
        }
        field.type = (item.type as Compact<u32>).toNumber();
        if (item.typeName.isSome) {
            field.typeName = (item.typeName.value as Text).toString();
        }
        field.docs = (item.docs as Array<Text>).map((t) => { return t.toString(); });

        // Push to storage, track Id.
        await field.save();
        ids.push(field.id);
    }

    e.fieldsId = ids;
    e.index = meta.index.toNumber();
    e.docs = (meta.docs as Array<Text>).map((t) => { return t.toString(); });

    // Map function arguments.
    var ids = new Array();
    for (let item of meta.args) {
        const arg = new FunctionArgument("");

        arg.name = (item.name as Text).toString();
        arg.type = (item.type as Text).toString();
        if (item.typeName.isSome) {
            arg.typeName = (item.typeName.value as Text).toString();
        }

        // Push to storage, track Id.
        await arg.save();
        ids.push(arg.id);
    }

    // Map function argument Ids, save extrinsic to storage.
    e.argsId = ids;
    await e.save();
}
