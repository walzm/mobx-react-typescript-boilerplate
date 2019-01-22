import { IIdField, IdField } from "./idField";
import { IStateModelNode, GW_METADATA_MODEL_FIELD_METADATA, GW_METADATA_MODEL_FIELDS, IFieldAllMetadata } from "./commonModelTypes";
import { observable } from "mobx";
import { IBaseValueField } from "./baseValueField";

export type ValueFieldProperties<T> = ({ [P in keyof T]: T[P] extends IBaseValueField<any> ? P : never })[keyof T]
type OnCreateInstanceListener<TComplexType extends IComplexType> = (instance: TComplexType) => void;

export interface IModelContext {
    onCreateInstance<TComplexType extends IComplexType>(complexType: new () => TComplexType, eventListener: OnCreateInstanceListener<TComplexType>);
}

class ModelContext implements IModelContext {
    protected onCreateInstanceListeners = [];

    onCreateInstance<TComplexType extends IComplexType>(complexType: new () => TComplexType, eventListener: OnCreateInstanceListener<TComplexType>) {
        this.onCreateInstanceListeners.push({
            ctor: complexType,
            eventListener: eventListener
        });
    }

    fireOnCreateInstance(ctor, instance) {
        this.onCreateInstanceListeners.filter((listener) => listener.ctor === ctor).forEach((listener) => listener.eventListener(instance));
    }
}
export function createModelContext(): IModelContext {
    return new ModelContext();
}

export function field(fieldMetadata?: IFieldAllMetadata) {
    return function (target: any, key: string | symbol, baseDescriptor?: PropertyDescriptor) {
        let fields = Reflect.getOwnMetadata(GW_METADATA_MODEL_FIELDS, target);
        if (fields == null) {
            let baseTypeFields = Reflect.getMetadata(GW_METADATA_MODEL_FIELDS, target);
            if (baseTypeFields) {
                fields = [...baseTypeFields];
                if (fields.indexOf(key) < 0) {
                    fields.push(key);
                }
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
        let property = observable(target, key, baseDescriptor);
        return property;
    }
}

export interface IComplexType extends IStateModelNode {
    readonly id: IIdField;
    getFieldNames(): string[];
    updateOriginalValue();
    findClosest<TComplexType extends IComplexType>(complexType: new() => TComplexType);
}

export class ComplexType implements IComplexType {
    readonly parent: IStateModelNode;
    @field()
    id: IIdField = new IdField();
    private init() {
        this.initFields();
    }
    private initFields() {
        let fieldNames = this.getFieldNames();
        fieldNames.forEach((fieldName) => {
            let field = this[fieldName];
            field.parent = this;
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

    onValueChanged<TComplexType extends this>(propertyName: ValueFieldProperties<TComplexType>, eventListener: (target: this, value: any, previousValue: any, propertyName: ValueFieldProperties<TComplexType>) => void) {
        let valueField = this[propertyName as string] as IBaseValueField<any>;
        valueField && valueField.attachOnValueChanged(eventListener as any);
    }
    public findClosest<TComplexType extends IComplexType>(complexType: new() => TComplexType): TComplexType {
        let currentNode = this.parent;
        while (currentNode != null) {
            if (currentNode.constructor == complexType) {
                return currentNode as TComplexType;
            }
            currentNode = currentNode.parent;
        }
    }
}

export function createModelInstance<TComplexType extends IComplexType>(complexType: new () => TComplexType, parent?: IStateModelNode, modelContext?: IModelContext): TComplexType {
    let instance = new complexType();
    let instanceAsAny = instance as any;
    instanceAsAny.init();
    instanceAsAny.parent = parent;
    if (modelContext) {
        instanceAsAny.modelContext = modelContext;
        modelContext && (modelContext as ModelContext).fireOnCreateInstance(complexType, instance);
    }
    console.log(instance);
    return instance;
}
