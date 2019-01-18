import { observable, computed, isObservable, autorun, transaction } from 'mobx';
import "reflect-metadata";

export const GW_METADATA_MODEL_FIELDS = Symbol();
export const GW_METADATA_MODEL_FIELD_METADATA = Symbol();

export interface IFieldLabel {
    texts: {
        [key: string]: string;
    }
}

export interface IFieldMetadata {
    name?: string;
    label?: IFieldLabel;
    shortLabel?: IFieldLabel;
    hideLabel?: boolean;
    icon?: string;
    hidden?: boolean;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    minLength?: number;
    maxLength?: number;
    minDecimals?: number;
    maxDecimals?: number;
    minValue?: number;
    maxValue?: number;
    serviceName?: string;
    filter?: string;
    canInsert?: boolean;
    canDelete?: boolean;
    insertDisabled?: boolean;
    deleteDisabled?: boolean;
    serverPaged?: boolean;
    subType?: FieldSubType
};

export type ReadonlyArrayInnerType<T> = T extends ReadonlyArray<infer U> ? U : never;
export type ArrayFieldInnerType<T> = T extends IArrayField<infer U> ? U : never;

export function createModelInstance<TComplexType extends IComplexType>(complexType: new () => TComplexType): TComplexType {
    let instance = new complexType();
    let instanceAsAny = instance as any;
    instanceAsAny.init();
    return instance;
}

export function observableField(target: any, key: string | symbol, baseDescriptor?: PropertyDescriptor) {
    return observable(target, key, baseDescriptor);
}

export function field(fieldMetadata?: IFieldMetadata) {
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
        fieldMetadata = fieldMetadata || {} as IFieldMetadata;
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
export const enum MessageSource {
    Server,
    Client
}
export class Message {
    message: string;
    severity: string;
    source: MessageSource;
}

export interface IStateModelNode {
    readonly $parent: IStateModelNode;
    writeSnapshot(): any;
    applySnapshot(snapshot: any);
    writeTransportModel(): any;
    applyTransportModel(transportModel: any);
}
export abstract class StateModelNode implements IStateModelNode {
    readonly $parent: IStateModelNode;
    abstract writeSnapshot(): any;
    abstract applySnapshot(snapshot: any);
    abstract writeTransportModel(): any;
    abstract applyTransportModel(transportModel: any);
}
export interface IField extends IStateModelNode {
    readonly modified: boolean;
    hidden: boolean;
    label: string;
    shortLabel: string;
    messages: Message[];
    updateOriginalValue();
    applyMetadata(metadata: IFieldMetadata);
}
export abstract class Field extends StateModelNode implements IField {
    abstract readonly modified: boolean;
    @observableField hidden: boolean;
    @observableField label: string;
    @observableField shortLabel: string;
    @observableField messages = [];
    abstract updateOriginalValue();
    applyMetadata(metadata: IFieldMetadata) {
        if (metadata.label) {
            this.label = metadata.label.texts["de-DE"];
        }
        if (metadata.shortLabel) {
            this.shortLabel = metadata.shortLabel.texts["de-DE"];
        }
        if (metadata.hidden != null) {
            this.hidden = metadata.hidden;
        }
    }
    writeSnapshot() {
        return {
            label: this.label,
            hidden: this.hidden,
            messages: this.messages.map((message) => ({ ...message }))
        }
    }
    applySnapshot(snapshot: any) {
        this.label = snapshot.label;
        this.hidden = snapshot.hidden;
        if (snapshot.messages) {
            this.messages = [...snapshot.messages];
        }
    }
}
export interface IActionField extends IField {
    disabled: boolean;
    icon: string;
    hideLabel: boolean;
    executeAction();
}

export class ActionField extends Field implements IActionField {
    @observableField modified = false;
    @observableField disabled: boolean;
    @observableField icon: string;
    @observableField hideLabel: boolean;
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.disabled != null) {
            this.disabled = metadata.disabled;
        }
        if (metadata.icon != null) {
            this.icon = metadata.icon;
        }
        if (metadata.hideLabel != null) {
            this.hideLabel = metadata.hideLabel;
        }

    }
    updateOriginalValue() {
        // nothing to do
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.icon = this.icon;
        snapshot.hideLabel = this.hideLabel;
        snapshot.disabled = this.disabled;
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.icon = snapshot.icon;
        this.hideLabel = snapshot.hideLabel;
        this.disabled = snapshot.disabled;
    }
    writeTransportModel() {
        return undefined;
    }
    applyTransportModel() {

    }
    executeAction() {
    }
}
export interface IValueField<TValue> extends IField {
    value: TValue;
    readonly originalValue: TValue;
    required: boolean;
    readOnly: boolean;
    disabled: boolean;
    setValue(value: TValue): TValue;
}
export abstract class ValueField<TValue> extends Field implements IValueField<TValue> {
    @observableField value: TValue;
    @observableField originalValue: TValue;
    @observableField required: boolean;
    @observableField readOnly: boolean;
    @observableField disabled: boolean;
    public setValue(value: TValue): TValue {
        let oldValue = this.value;
        this.value = value;
        if (value !== oldValue) {
            this.fireOnValueChanged(value, oldValue);
        }
        return oldValue;
    }
    @computed get modified(): boolean {
        return this.value !== this.originalValue;
    }
    protected fireOnValueChanged(value, oldValue) {
    }
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.disabled != null) {
            this.disabled = metadata.disabled;
        }
        if (metadata.required != null) {
            this.required = metadata.required;
        }
        if (metadata.readOnly != null) {
            this.readOnly = metadata.readOnly;
        }
    }
    public updateOriginalValue() {
        this.originalValue = this.value;
    }
    writeSnapshot(): any {
        let snapshot = super.writeSnapshot() as any;
        snapshot.value = this.writeValueForSnapshot(this.value);
        snapshot.originalValue = this.writeValueForSnapshot(this.originalValue);
        snapshot.required = this.required;
        snapshot.readOnly = this.readOnly;
        snapshot.disabled = this.disabled;
        return snapshot;
    }
    writeValueForSnapshot(value: TValue): any {
        return value;
    }
    readValueFromSnapshot(snapshot: any) {
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.value = this.readValueFromSnapshot(snapshot.value);
        this.originalValue = this.readValueFromSnapshot(snapshot.originalValue);
        this.required = snapshot.required;
        this.readOnly = snapshot.readOnly;
        this.disabled = snapshot.disabled;
    }
    writeTransportModel(): any {
        return this.value;
    }
    applyTransportModel(transportModel: any) {
        this.value = transportModel;
    }
}
export interface IBooleanField extends IValueField<boolean> {
}
export class BooleanField extends ValueField<boolean> implements IBooleanField {
}
export enum FieldSubType {
    Text = "text",
    Url = "url",
    Phone = "phone",
    Multiline = "multiline"
}
export interface ITextField extends IValueField<string> {
    minLength: number;
    maxLength: number;
    subType: FieldSubType;

}
export class TextField extends ValueField<string> implements ITextField {
    @observableField minLength: number;
    @observableField maxLength: number;
    @observableField subType: FieldSubType;
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.minLength != null) {
            this.minLength = metadata.minLength;
        }
        if (metadata.maxLength != null) {
            this.maxLength = metadata.maxLength;
        }
        if (metadata.subType != null) {
            this.subType = metadata.subType;
        }
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.minLength = this.maxLength;
        snapshot.maxLength = this.maxLength;
        snapshot.subType = this.subType;
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.minLength = snapshot.minLength;
        this.maxLength = snapshot.maxLength;
        this.subType = snapshot.subType;
    }
}
export interface ITextLocalizedField extends IValueField<Map<string, string>> {
    minLength: number;
    maxLength: number;
    subType: FieldSubType;

}
export class TextLocalizedField extends ValueField<Map<string, string>> implements ITextLocalizedField {
    @observableField minLength: number;
    @observableField maxLength: number;
    @observableField subType: FieldSubType;
    @computed get modified(): boolean {
        if (this.value.size !== this.originalValue.size) {
            return true;
        }
        for (var [key, value] of this.value) {
            let originalValue = this.originalValue.get(key);
            if (originalValue !== value) {
                return true;
            }
        }
        return false;
    }
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.minLength != null) {
            this.minLength = metadata.minLength;
        }
        if (metadata.maxLength != null) {
            this.maxLength = metadata.maxLength;
        }
        if (metadata.subType != null) {
            this.subType = metadata.subType;
        }
    }
    writeValueForSnapshot(value: Map<string, string>) {
        return [...value];
    }
    readValueFromSnapshot(snapshot: any): Map<string, string> {
        return new Map<string, string>(snapshot);
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.minLength = this.maxLength;
        snapshot.maxLength = this.maxLength;
        snapshot.subType = this.subType;
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.minLength = snapshot.minLength;
        this.maxLength = snapshot.maxLength;
        this.subType = snapshot.subType;
    }
    writeTransportModel() {
        let transportModel = {} as any;
        for (var [key, value] of this.value) {
            transportModel[key] = value;
        }
        return this.value;
    }
    applyTransportModel(transportModel: any) {
        this.value.clear();
        transportModel && Object.keys(transportModel).forEach(key => { this.value.set(key, key[key]) });
    }

}

export interface IIntegerField extends IValueField<number> {
    minValue: number;
    maxValue: number;
}
export class IntegerField extends ValueField<number> implements IIntegerField {
    @observableField minValue: number;
    @observableField maxValue: number;
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.minValue != null) {
            this.minValue = metadata.minValue;
        }
        if (metadata.maxValue != null) {
            this.maxValue = metadata.maxValue;
        }
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.minValue = this.minValue;
        snapshot.maxValue = this.maxValue;
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.minValue = snapshot.minValue;
        this.maxValue = snapshot.maxValue;
    }
}
export interface IDecimalField extends IValueField<number> {
    minDecimals: number;
    maxDecimals: number;
    minValue: number;
    maxValue: number;
}
export class DecimalField extends ValueField<number> implements IDecimalField {
    @observableField minDecimals: number;
    @observableField maxDecimals: number;
    @observableField minValue: number;
    @observableField maxValue: number;
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.minDecimals != null) {
            this.minDecimals = metadata.minDecimals;
        }
        if (metadata.maxDecimals != null) {
            this.maxDecimals = metadata.maxDecimals;
        }
        if (metadata.minValue != null) {
            this.minValue = metadata.minValue;
        }
        if (metadata.maxValue != null) {
            this.maxValue = metadata.maxValue;
        }
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.minDecimals = this.minDecimals;
        snapshot.maxDecimals = this.maxDecimals;
        snapshot.minValue = this.minValue;
        snapshot.maxValue = this.maxValue;
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.minDecimals = snapshot.minDecimals;
        this.maxDecimals = snapshot.maxDecimals;
        this.minValue = snapshot.minValue;
        this.maxValue = snapshot.maxValue;
    }
}
export interface IOptionFieldOption {
    id: number;
    label: string;
}
export class OptionFieldOption implements IOptionFieldOption {
    id: number;
    label: string;
}

export interface IOptionField extends IValueField<number> {
    options: IOptionFieldOption[];
}
export class OptionField extends ValueField<number> implements IOptionField {
    @observableField options = [];
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.options = [...this.options];
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        if (snapshot.options != null) {
            this.options = [...snapshot.options];
        }
    }
}

export interface IReferenceField extends IValueField<number> {
    serviceName: string;
    filter: string;
}
export class ReferenceField extends ValueField<number> implements IReferenceField {
    @observableField displayLabel: string;
    @observableField description: string;
    @observableField serviceName: string;
    @observableField filter: string;
    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.serviceName != null) {
            this.serviceName = metadata.serviceName;
        }
        if (metadata.filter != null) {
            this.filter = metadata.filter;
        }
        super.applyMetadata(metadata);
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.displayLabel = this.displayLabel;
        snapshot.description = this.description;
        snapshot.serviceName = this.serviceName;
        snapshot.filter = this.filter;
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.displayLabel = snapshot.displayLabel;
        this.description = snapshot.description;
        this.serviceName = snapshot.serviceName;
        this.filter = snapshot.filter;
    }
    writeTransportModel() {
        return {
            id: this.value
        };
    }
    applyTransportModel(transportModel: any) {
        if (transportModel) {
            this.value = transportModel.id;
        }
        else {
            this.value = null;
            this.displayLabel = null;
            this.description = null;
        }
    }
}

export interface IComplexType extends IStateModelNode {
    readonly id: IIntegerField;
    readonly modified: boolean;
    getFieldNames(): string[];
    updateOriginalValue();
}
export class ComplexType extends StateModelNode implements IComplexType {
    constructor() {
        super();
    }
    @field()
    id: IIntegerField = new IntegerField();
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
    @computed public get modified(): boolean {
        return this.getFieldNames().some((fieldName => {
            let modified = this[fieldName].modified;
            if (modified) {
                // console.log(fieldName);
                // console.log(this[fieldName].writeSnapshot());
            }
            return modified;
        }));
    }
    public updateOriginalValue() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].updateOriginalValue();
        }));
    }
    public writeSnapshot() {
        return this.getFieldNames().reduce((snapshot, fieldName) => {
            snapshot[fieldName] = this[fieldName].writeSnapshot();
            return snapshot;
        }, {});
    }
    public applySnapshot(snapshot: any) {
        transaction(() => {
            this.getFieldNames().forEach((fieldName) => {
                if (fieldName in snapshot) {
                    this[fieldName].applySnapshot(snapshot[fieldName]);
                }
            });
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

export interface IComplexField<TComplexType extends IComplexType> extends IField {
    readonly value: TComplexType;
}

export class ComplexField<TComplexType extends IComplexType> extends Field implements IComplexField<TComplexType> {
    constructor(private _itemCtor: new () => TComplexType) {
        super();
        this.value = createModelInstance(_itemCtor);
        (this.value as any).$parent = this;
    }
    updateOriginalValue() {
        this.value.updateOriginalValue();
    }
    @computed public get modified(): boolean {
        return this.value.modified;
    }
    @observableField readonly value: TComplexType;
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.value = this.value.writeSnapshot();
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        this.value.applySnapshot(snapshot.value);
    }
    writeTransportModel() {
        return this.value.writeTransportModel();
    }
    applyTransportModel(transportModel: any) {
        this.value.applyTransportModel(transportModel);
    }
}

export interface IArrayField<TComplexType extends IComplexType> extends IField {
    disabled: boolean;
    readOnly: boolean;
    insertDisabled: boolean;
    deleteDisabled: boolean;
    canInsert: boolean;
    canDelete: boolean;

    skip: number;
    take: number;
    totalCount: number;
    loading: boolean;
    serverPaged: boolean

    readonly items: ReadonlyArray<TComplexType>;
    append(item?: TComplexType): TComplexType;
}

export class ArrayField<TComplexType extends IComplexType> extends Field implements IArrayField<TComplexType> {
    constructor(private _itemCtor: new () => TComplexType) {
        super();
    }
    @observableField originalItemCount: number = 0;

    @observableField disabled: boolean;
    @observableField readOnly: boolean;
    @observableField insertDisabled: boolean;
    @observableField deleteDisabled: boolean;
    @observableField canInsert: boolean;
    @observableField canDelete: boolean;

    @observableField skip: number;
    @observableField take: number;
    @observableField totalCount: number;
    @observableField loading: boolean;
    @observableField serverPaged: boolean

    @observableField
    private _items: TComplexType[] = [];

    @computed get items(): ReadonlyArray<TComplexType> {
        return this._items;
    }
    public append(item?: TComplexType): TComplexType {
        if (item == null) {
            let ctor = this._itemCtor;
            item = createModelInstance(ctor);
            (item as any).$parent = this;
        }
        this._items.push(item);
        return item;
    }
    @computed public get modified(): boolean {
        if (this.originalItemCount !== this._items.length) {
            return true;
        }
        return this._items.some((item) => item.modified);
    }

    applyMetadata(metadata: IFieldMetadata) {
        super.applyMetadata(metadata);
        if (metadata.disabled != null) {
            this.disabled = metadata.disabled;
        }
        if (metadata.readOnly != null) {
            this.readOnly = metadata.readOnly;
        }
        if (metadata.insertDisabled != null) {
            this.insertDisabled = metadata.insertDisabled;
        }
        if (metadata.deleteDisabled != null) {
            this.deleteDisabled = metadata.deleteDisabled;
        }
        if (metadata.canInsert != null) {
            this.canInsert = metadata.canInsert;
        }
        if (metadata.canDelete != null) {
            this.canDelete = metadata.canDelete;
        }
    }
    updateOriginalValue() {
        this.originalItemCount = this._items.length;
        this._items.forEach((item) => item.updateOriginalValue());
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot() as any;
        snapshot.items = this._items.map((item) => item.writeSnapshot());

        snapshot.originalItemCount = this.originalItemCount;

        snapshot.disabled = this.disabled;
        snapshot.readOnly = this.readOnly;
        snapshot.insertDisabled = this.insertDisabled;
        snapshot.deleteDisabled = this.deleteDisabled;
        snapshot.canInsert = this.canInsert;
        snapshot.canDelete = this.canDelete;

        snapshot.skip = this.skip;
        snapshot.take = this.take;
        snapshot.totalCount = this.totalCount;
        snapshot.loading = this.loading;
        snapshot.serverPaged = this.serverPaged;
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        super.applySnapshot(snapshot);
        snapshot.items && snapshot.items && snapshot.items.map && snapshot.items.forEach((snapshotItem, index) => {
            let item;
            if (index < this._items.length) {
                item = this._items[index];
            } else {
                item = createModelInstance(this._itemCtor);
                (item as any).$parent = this;
            }
            item.applySnapshot(snapshotItem);
            this._items.push(item);
        });

        this.originalItemCount = snapshot.originalItemCount;
        this.disabled = snapshot.disabled;
        this.readOnly = snapshot.readOnly;
        this.insertDisabled = snapshot.insertDisabled;
        this.deleteDisabled = snapshot.deleteDisabled;
        this.canInsert = snapshot.canInsert;
        this.canDelete = snapshot.canDelete;

        this.skip = snapshot.skip;
        this.take = snapshot.take;
        this.totalCount = snapshot.totalCount;
        this.loading = snapshot.loading;
        this.serverPaged = snapshot.serverPaged;
    }
    writeTransportModel() {
        return this._items.map((item) => {
            return item.writeTransportModel();
        });
    }
    applyTransportModel(transportModel: any) {
        let newItems = transportModel && transportModel.map && transportModel.map((transportModelItem) => {
            let item = createModelInstance(this._itemCtor);
            item.applyTransportModel(transportModelItem);
            (item as any).$parent = this;
            return item;
        });
        if (newItems != null) {
            this._items = newItems;
        }
    }
}
