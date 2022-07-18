import { SubstrateExtrinsic } from "@subql/types";
import { Extrinsic, Parameter } from "../types";
import { makeExtrinsic } from "./utils";

export async function handleExtrinsic(extrinsic: SubstrateExtrinsic): Promise<void> {
    // Extract info about the extrinsic via the metadata.
    const meta = extrinsic.extrinsic.meta;
    
    const e: Extrinsic = makeExtrinsic(extrinsic)

    // Name of the extrinsic
    e.method = extrinsic.extrinsic.method.method
    e.module = extrinsic.extrinsic.method.section 
    e.docs = meta.docs.map((t) => { return t.toString(); });

    // Call data.
    const raw = extrinsic.extrinsic.data;
    if (raw.length >= 1) {
        if (raw.length != 1 && raw[0] != 0) { // [0] = empty
            e.call_data = Buffer.from(raw).toString("hex");
        }
    }

    await e.save();

    // Map Parameters fields
    for (const [i,item] of meta.fields.entries()) {
        const p = new Parameter(`${e.id}-parameter-${i}`)
        p.docs = item.docs.map((t) => { return t.toString(); });
        p.name = item.name.unwrapOrDefault().toString()
        p.type = item.type.toNumber();
        p.typeName =  meta.args[i].typeName.unwrapOrDefault().toString()
        p.typeName2 = item.typeName.unwrapOrDefault().toString()
        p.extrinsicId = e.id

        const value = extrinsic.extrinsic.method.args[i]
        p.value = JSON.stringify(value.toHuman())

        await p.save();
    }
}
