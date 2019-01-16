
import { observable, computed, isObservable, autorun } from 'mobx';
import { render } from './render';
import "reflect-metadata";

export const GW_METADATA_MODEL_FIELDS = Symbol();
export const GW_METADATA_MODEL_FIELD_METADATA = Symbol();

interface IFieldLabel {

}
interface IFieldMetadata {
    name?: string;
    label?: IFieldLabel;
    hidden?: boolean;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minDecimals?: number;
    maxDecimals?: number;
    minValue?: number;
    maxValue?: number;
};

type ReadonlyArrayInnerType<T> = T extends ReadonlyArray<infer U> ? U : never;
type ArrayFieldInnerType<T> = T extends IArrayField<infer U> ? U : never;

function field(fieldMetadata?: IFieldMetadata) {
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

interface IStateModelNode {
    readonly $parent: IStateModelNode;
}
class StateModelNode implements IStateModelNode {
    readonly $parent: IStateModelNode;
}
interface IField extends IStateModelNode {
    readonly modified: boolean;
    updateOriginalValue();
    applyMetadata(metadata: IFieldMetadata);
}
abstract class Field extends StateModelNode implements IField {
    abstract readonly modified: boolean;
    abstract updateOriginalValue();
    applyMetadata(metadata: IFieldMetadata) {
        console.log(metadata);
    }
}
interface IValueField<TValue> extends IField {
    value: TValue;
    originalValue: TValue;
    setValue(value: TValue): TValue;
}
class ValueField<TValue> extends Field implements IValueField<TValue> {
    @observable value: TValue;
    @observable originalValue: TValue;
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
    public updateOriginalValue() {
        this.originalValue = this.value;
    }
}

interface ITextField extends IValueField<string> {
}
class TextField extends ValueField<string> implements ITextField {
}
interface IIntegerField extends IValueField<number> {
}
class IntegerField extends ValueField<number> implements IIntegerField {
}

interface IComplexType extends IStateModelNode {
    readonly id: IIntegerField;
    readonly modified: boolean;
    getFieldNames(): string[];
    updateOriginalValue();
}
class ComplexType extends StateModelNode implements IComplexType {
    constructor() {
        super();
    }

    @field()
    id: IIntegerField = new IntegerField();
    public init() {
        this.initFields();
    }
    protected initFields() {
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
            return this[fieldName].modified;
        }));
    }
    public updateOriginalValue() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].updateOriginalValue();
        }));
    }
}

interface IComplexField<TComplexType extends IComplexType> extends IField {
    readonly value: TComplexType;
}

class ComplexField<TComplexType extends IComplexType> extends Field implements IComplexField<TComplexType> {
    constructor(private _itemCtor: new () => TComplexType) {
        super();
        this.value = new _itemCtor();
        (this.value as any).$parent = this;
        (this.value as any).init();
    }
    updateOriginalValue() {
        this.value.updateOriginalValue();
    }
    @computed public get modified(): boolean {
        return this.value.modified;
    }
    @observable readonly value: TComplexType;
}

interface IArrayField<TComplexType extends IComplexType> extends IField {
    readonly items: ReadonlyArray<TComplexType>;
    append(item?: TComplexType): TComplexType;
}

class ArrayField<TComplexType extends IComplexType> extends Field implements IArrayField<TComplexType> {
    constructor(private _itemCtor: new () => TComplexType) {
        super();
    }
    @field()
    private _items = [];

    @computed get items(): ReadonlyArray<TComplexType> {
        return this._items;
    }
    public append(item?: TComplexType): TComplexType {
        if (item == null) {
            let ctor = this._itemCtor;
            item = new ctor();
            (item as any).$parent = this;
            (item as any).init();
        }
        this._items.push(item);
        return item;
    }
    modified: boolean;
    updateOriginalValue() {
    }
}

interface IAddress extends IComplexType {
    readonly line1: ITextField;
}

class Address extends ComplexType implements IAddress {
    @field()
    line1: ITextField = new TextField();
}

interface IExtendedAddress extends IAddress {
    readonly line1: ITextField;
    readonly line2: ITextField;
}

class ExtendedAddress extends Address implements IExtendedAddress {
    @field()
    readonly line2 = new TextField();
}

interface ICustomer extends ComplexType {
    readonly name: ITextField;
    readonly address: IComplexField<IAddress>;
    readonly addresses: IArrayField<IAddress>;
}

class Customer extends ComplexType implements ICustomer {
    @field({
        label: "Name"
    })
    name: ITextField = new TextField();
    @field({
        label: "Name2"
    })
    name2: ITextField = new TextField();
    @field({
        label: "Addresse"
    })
    address: IComplexField<IAddress> = new ComplexField(Address);
    @field()
    addresses: IArrayField<IAddress> = new ArrayField(Address);
}

interface ISpecialCustomer extends ICustomer {
    readonly matchcode: ITextField;
    readonly address: IComplexField<IExtendedAddress>;
    readonly addresses: IArrayField<IExtendedAddress>;
}

class SpecialCustomer extends Customer implements ISpecialCustomer {
    @field({
        minLength: 5
    })
    readonly name2: ITextField = new TextField();

    @field({
        label: "Matchcode"
    })
    readonly matchcode: ITextField = new TextField();
    @field()
    readonly address: IComplexField<IExtendedAddress> = new ComplexField(ExtendedAddress);
    @field()
    readonly addresses: IArrayField<IExtendedAddress> = new ArrayField(ExtendedAddress);
}

class ListDetailViewModel<TListType extends IComplexType, TDetailType extends IComplexType> extends ComplexType {
    constructor(listCtor: new () => TListType, detailCtor: new () => TDetailType) {
        super();
        this.detail = new ComplexField(detailCtor);
        this.items = new ArrayField<TListType>(listCtor);
    }
    @field()
    readonly items: IArrayField<TListType>;
    @field()
    readonly detail: IComplexField<TDetailType>;
}

class ListDetailView<TL extends IComplexType, TD extends IComplexType> {
    constructor(listCtor: new () => TL, detailCtor: new () => TD) {
        this.model = new ListDetailViewModel(listCtor, detailCtor);
    }
    model: ListDetailViewModel<TL, TD>;
}


new ListDetailView(Customer, SpecialCustomer);

const customer = new SpecialCustomer();

customer.init();
customer.updateOriginalValue();
console.log(customer.getFieldNames());
console.log(customer.address.value.getFieldNames());

console.log(customer.address.value.getFieldNames());
console.log(Reflect.getMetadata(GW_METADATA_MODEL_FIELD_METADATA, customer, "address"));
console.log(Reflect.getMetadata(GW_METADATA_MODEL_FIELD_METADATA, customer, "name"));
console.log(Reflect.getMetadata(GW_METADATA_MODEL_FIELD_METADATA, customer, "name2"));

autorun(() => {
    console.log(customer.modified);
});

customer.address.value.line1.value = "hi";
customer.address.value.line1.value = undefined;

let secs = 0;
setInterval(() => {
    secs++;
    customer.name.value = " Time: " + secs;
}, 1000)

setTimeout(() => {
    customer.address.value.line1.value = "xxxx";
}, 2000)

setTimeout(() => {
}, 10000)

setInterval(() => {
    let num = customer.addresses.items.length;
    if (num > 0) {
        customer.addresses.items[num - 1].line1.value = "done";
    }
    let a = customer.addresses.append();
    a.line1.value = "number: " + num;
    a.line2.setValue(a.line1.value);

    type a = ReadonlyArrayInnerType<typeof customer.addresses.items>;
    type b = ArrayFieldInnerType<typeof customer.addresses>;
    let x: b;
}, 3000)

console.log(customer);
render(customer);