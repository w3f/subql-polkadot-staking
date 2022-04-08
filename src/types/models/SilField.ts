// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type SilFieldProps = Omit<SilField, NonNullable<FunctionPropertyNames<SilField>>>;

export class SilField implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public name?: string;

    public type: number;

    public typeName?: string;

    public docs: string[];

    public extrinsicId: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save SilField entity without an ID");
        await store.set('SilField', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove SilField entity without an ID");
        await store.remove('SilField', id.toString());
    }

    static async get(id:string): Promise<SilField | undefined>{
        assert((id !== null && id !== undefined), "Cannot get SilField entity without an ID");
        const record = await store.get('SilField', id.toString());
        if (record){
            return SilField.create(record as SilFieldProps);
        }else{
            return;
        }
    }


    static async getByExtrinsicId(extrinsicId: string): Promise<SilField[] | undefined>{
      
      const records = await store.getByField('SilField', 'extrinsicId', extrinsicId);
      return records.map(record => SilField.create(record as SilFieldProps));
      
    }


    static create(record: SilFieldProps): SilField {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new SilField(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
