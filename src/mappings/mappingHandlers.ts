import { SubstrateExtrinsic, SubstrateEvent, SubstrateBlock } from "@subql/types";
import { Extrinsic, FunctionArgument, SilField } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import { Text, Compact, u32 } from "@polkadot/types-codec";

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const e = new Extrinsic("");
    const m = extrinsic.extrinsic.meta;
    e.name = (m.name as Text).toHuman();

    var ids = new Array();
    for (let item of m.fields) {
        const field = new SilField("");

        if (item.name.isSome) {
            field.name = (item.name.value as Text).toString();
        }
        field.type = (item.type as Compact<u32>).toNumber();
        if (item.typeName.isSome) {
            field.typeName = (item.typeName.value as Text).toString();
        }
        field.docs = (item.docs as Array<Text>).map((t) => { return t.toString(); });

        await field.save();
        ids.push(field.id);
    }

    e.fieldsId = ids;
    e.index = m.index.toNumber();
    e.docs = (m.docs as Array<Text>).map((t) => { return t.toString(); });

    var ids = new Array();
    for (let item of m.args) {
        const arg = new FunctionArgument("");

        arg.name = (item.name as Text).toString();
        arg.type = (item.type as Text).toString();
        if (item.typeName.isSome) {
            arg.typeName = (item.typeName.value as Text).toString();
        }

        await arg.save();
        ids.push(arg.id);
    }

    e.argsId = ids;
    await e.save();
}
