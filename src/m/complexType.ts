import { IIdField, IdField } from "./idField";
import { IStateModelNode, GW_METADATA_MODEL_FIELD_METADATA, GW_METADATA_MODEL_FIELDS, IFieldAllMetadata } from "./modelBase";
import { observable } from "mobx";

export function field(fieldMetadata?: IFieldAllMetadata) {
    return function (target: any, key: string | symbol, baseDescriptor?: PropertyDescriptor) {
        let fields = Reflect.getOwnMetadata(GW_METADATA_MODEL_FIELDS, target);
        if (fields == null) {
            let baseTypeFields = Reflect.getMetadata(GW_METADATA_MODEL_FIELDS, target);
            if (baseTypeFields) {
                fields = [...baseTypeFields, key];
            } else {
                fields = [key];
            }
            Reflect.defineMetadata(GW_METADATA_MODEL_FIELDS, fields, target);
        } else if (fields.indexOf(key) < 0) {
            fields.push(key);
        }
        fieldMetadata = fieldMetadata || {} as IFieldAllMetadata;
        fieldMetadata.name = key as string;
        let baseTypeFieldMetadata = Reflect.getMetadata(GW_METADATA_MODEL_FIELD_METADATA, target, key);
        if (baseTypeFieldMetadata != null) {
            fieldMetadata = {
                ...baseTypeFieldMetadata,
                ...fieldMetadata
            };
        }
        Reflect.defineMetadata(GW_METADATA_MODEL_FIELD_METADATA, fieldMetadata, target, key);
        return observable(target, key, baseDescriptor);
    }
}

export interface IComplexType extends IStateModelNode {
    readonly id: IIdField;
    getFieldNames(): string[];
    updateOriginalValue();
}

export class ComplexType implements IComplexType {
    $parent: IStateModelNode;
    @field()
    id: IIdField = new IdField();
    private init() {
        this.initFields();
    }
    private initFields() {
        let fieldNames = this.getFieldNames();
        fieldNames.forEach((fieldName) => {
            let field = this[fieldName];
            field.$parent = this;
            let fieldMetadata = Reflect.getMetadata(GW_METADATA_MODEL_FIELD_METADATA, this, fieldName);
            fieldMetadata && field.applyMetadata(fieldMetadata);
        });
    }
    public getFieldNames(): string[] {
        return Reflect.getMetadata(GW_METADATA_MODEL_FIELDS, this);
    }
    public updateOriginalValue() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].updateOriginalValue();
        }));
    }
    public writeSnapshot() {
        return this.getFieldNames().reduce((snapshot, fieldName) => {
            let value = this[fieldName].writeSnapshot();
            if (value !== undefined) {
                snapshot[fieldName] = value;
            }
            return snapshot;
        }, {});
    }
    public applySnapshot(snapshot: any) {
        this.getFieldNames().forEach((fieldName) => {
            if (fieldName in snapshot) {
                this[fieldName].applySnapshot(snapshot[fieldName]);
            }
        });

    }
    writeTransportModel() {
        return this.getFieldNames().reduce((transportModel, fieldName) => {
            let value = this[fieldName].writeTransportModel();
            if (value !== undefined) {
                transportModel[fieldName] = value;
            }
            return transportModel;
        }, {});
    }
    applyTransportModel(transportModel: any) {
        this.getFieldNames().forEach((fieldName) => {
            if (fieldName in transportModel) {
                this[fieldName].applyTransportModel(transportModel[fieldName]);
            }
        });
    }
}

export function createModelInstance<TComplexType extends IComplexType>(complexType: new () => TComplexType): TComplexType {
    let instance = new complexType();
    let instanceAsAny = instance as any;
    instanceAsAny.init();
    return instance;
}
