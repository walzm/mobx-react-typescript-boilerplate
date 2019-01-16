
import { observable, computed, isObservable, autorun } from 'mobx';
import { render } from './render';

type ReadonlyArrayInnerType<T> = T extends ReadonlyArray<(infer U)> ? U : never;
type ArrayFieldInnerType<T> = T extends IArrayField<(infer U)> ? U : never;

const field = observable;
interface IFieldMetadata {

}
interface IComplexTypeMetadata {
    name: string;
    properties?: {
        [key: string]: IFieldMetadata
    }
}

function extendComplexTypeMetadata(baseTypeMetadata: IComplexTypeMetadata, derrivedTypeMetadata: IComplexTypeMetadata): IComplexTypeMetadata {
    let properties = {};
    if (baseTypeMetadata && baseTypeMetadata.properties) {
        properties = {
            ...baseTypeMetadata.properties
        };
    }
    if (derrivedTypeMetadata && derrivedTypeMetadata.properties) {
        properties = {
            ...properties,
            ...derrivedTypeMetadata.properties
        };
    }
    return {
        name: derrivedTypeMetadata.name,
        properties: properties
    }
}

interface IStateModelNode {
    readonly $parent: IStateModelNode;
}
class StateModelNode implements IStateModelNode {
    readonly $parent: IStateModelNode;
}
interface IField extends IStateModelNode {
    readonly fieldName: string;
    readonly modified: boolean;
    updateSnapshot();
}
abstract class Field extends StateModelNode implements IField {
    public fieldName: string;
    abstract readonly modified: boolean;
    abstract updateSnapshot();
}
interface IValueField<TValue> extends IField {
    value: TValue;
    snapshotValue: TValue;
    setValue(value: TValue);
}
class ValueField<TValue> extends Field implements IValueField<TValue> {
    @observable value: TValue;
    @observable snapshotValue: TValue;
    public setValue(value: TValue) {
        let oldValue = this.value;
        this.value = value;
        if (value !== oldValue) {
            this.fireOnValueChanged(value, oldValue);
        }
    }
    @computed get modified(): boolean {
        return this.value !== this.snapshotValue;
    }
    protected fireOnValueChanged(value, oldValue) {
    }
    public updateSnapshot() {
        this.snapshotValue = this.value;
    }
}

interface ITextField extends IValueField<string> {
}

class TextField extends ValueField<string> implements ITextField {
}
interface IComplexType extends IStateModelNode {
    readonly modified: boolean;
    updateSnapshot();
}
class ComplexType extends StateModelNode implements IComplexType {
    constructor() {
        super();
        let metadata = this.getMetadata();
        if (!metadata) {
            throw new Error("A complex type needs to defina a static property metadata of type IComplexTypeMetadata: " + this.constructor.name);
        }
    }
    getMetadata(): IComplexTypeMetadata {
        return (this.constructor as any).metaData as IComplexTypeMetadata;
    }
    public init() {
        this.initFields();
        this.initStaticMetadata();
    }
    protected initStaticMetadata() {
    }
    protected initFields() {
        let fieldNames = this.getFieldNames();
        fieldNames.forEach((propertyName) => {
            let propertyValue = this[propertyName];
            propertyValue.fieldName = propertyName;
            propertyValue.$parent = this;
        });
    }
    protected getFieldNames(): string[] {
        let fieldNames = (this as any).$gwFieldNames;
        if (fieldNames) {
            return fieldNames;
        }
        fieldNames = (this as any).$gwFieldNames = [];
        Object.getOwnPropertyNames(this).forEach((propertyName) => {
            let propertyValue = this[propertyName];
            if (propertyName.charAt(0) !== "$" && isObservable(propertyValue)) {
                fieldNames.push(propertyName);
            }
        });
        return fieldNames;
    }
    @computed public get modified(): boolean {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].modified;
        }));
    }
    public updateSnapshot() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].updateSnapshot();
        }));
    }
}

interface IComplexField<TComplexType extends IComplexType> extends IField {
    readonly value: TComplexType;
    getItemMetadata(): IComplexTypeMetadata;
}

class ComplexField<TComplexType extends IComplexType> extends Field implements IComplexField<TComplexType> {
    constructor(private _itemCtor: new () => TComplexType) {
        super();
        this.value = new _itemCtor();
        (this.value as any).$parent = this;
        (this.value as any).init();
    }
    public getItemMetadata(): IComplexTypeMetadata {
        return (this._itemCtor as any).metaData as IComplexTypeMetadata;
    }
    updateSnapshot() {
        this.value.updateSnapshot();
    }
    @computed public get modified(): boolean {
        return this.value.modified;
    }
    @field readonly value: TComplexType;
}

interface IArrayField<TComplexType extends IComplexType> extends IField {
    readonly items: ReadonlyArray<TComplexType>;
    getItemsMetadata(): IComplexTypeMetadata;
    append(item?: TComplexType): TComplexType;
}

class ArrayField<TComplexType extends IComplexType> extends Field implements IArrayField<TComplexType> {
    constructor(private _itemCtor: new () => TComplexType) {
        super();
    }
    @field private _items = [];
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
    public getItemsMetadata(): IComplexTypeMetadata {
        return (this._itemCtor as any).metaData as IComplexTypeMetadata;
    }
    modified: boolean;
    updateSnapshot() {
    }
}

interface IAddress extends IComplexType {
    readonly line1: ITextField;
}

class Address extends ComplexType implements IAddress {
    static metaData = {
        name: "Address"
    };
    @field line1: ITextField = new TextField();
}

interface IExtendedAddress extends IAddress {
    readonly line1: ITextField;
    readonly line2: ITextField;
}

class ExtendedAddress extends Address implements IExtendedAddress {
    static readonly metaData = extendComplexTypeMetadata(Address.metaData, {
        name: "ExtendedAddress",
        properties: {
            line1: {
                label: "abc"
            }
        }
    })

    @field readonly line2 = new TextField();
}

interface ICustomer extends ComplexType {
    readonly name: ITextField;
    readonly address: IComplexField<IAddress>;
    readonly addresses: IArrayField<IAddress>;
}

class Customer extends ComplexType implements ICustomer {
    static metaData: IComplexTypeMetadata = {
        name: "Customer",
        properties: {
            name
        }
    };
    @field name: ITextField = new TextField();
    @field address: IComplexField<IAddress> = new ComplexField(Address);
    @field addresses: IArrayField<IAddress> = new ArrayField(Address);
}

interface ISpecialCustomer extends ICustomer {
    readonly matchcode: ITextField;
    readonly address: IComplexField<IExtendedAddress>;
    readonly addresses: IArrayField<IExtendedAddress>;
}

class SpecialCustomer extends Customer implements ISpecialCustomer {
    static metaData: IComplexTypeMetadata = extendComplexTypeMetadata(Customer.metaData, {
        name: "SpecialCustomer"
    });
    @field readonly matchcode: ITextField = new TextField();
    @field readonly address: IComplexField<IExtendedAddress> = new ComplexField(ExtendedAddress);
    @field readonly addresses: IArrayField<IExtendedAddress> = new ArrayField(ExtendedAddress);
}

class ListDetailViewModel<TListType extends IComplexType, TDetailType extends IComplexType> extends ComplexType {
    static metaData: IComplexTypeMetadata = {
        name: "ListDetailViewModel"
    };

    constructor(listCtor: new () => TListType, detailCtor: new () => TDetailType) {
        super();
        this.detail = new ComplexField(detailCtor);
        this.items = new ArrayField<TListType>(listCtor);
    }
    @field items: IArrayField<TListType>;
    @field detail: IComplexField<TDetailType>;
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
customer.updateSnapshot();
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