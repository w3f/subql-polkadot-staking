// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type FunctionArgumentProps = Omit<FunctionArgument, NonNullable<FunctionPropertyNames<FunctionArgument>>>;

export class FunctionArgument implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public name: string;

    public type: string;

    public typeName?: string;

    public extrinsicId: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save FunctionArgument entity without an ID");
        await store.set('FunctionArgument', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove FunctionArgument entity without an ID");
        await store.remove('FunctionArgument', id.toString());
    }

    static async get(id:string): Promise<FunctionArgument | undefined>{
        assert((id !== null && id !== undefined), "Cannot get FunctionArgument entity without an ID");
        const record = await store.get('FunctionArgument', id.toString());
        if (record){
            return FunctionArgument.create(record as FunctionArgumentProps);
        }else{
            return;
        }
    }


    static async getByExtrinsicId(extrinsicId: string): Promise<FunctionArgument[] | undefined>{
      
      const records = await store.getByField('FunctionArgument', 'extrinsicId', extrinsicId);
      return records.map(record => FunctionArgument.create(record as FunctionArgumentProps));
      
    }


    static create(record: FunctionArgumentProps): FunctionArgument {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new FunctionArgument(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
