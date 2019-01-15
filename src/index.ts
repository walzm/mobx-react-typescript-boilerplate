
import { observable, computed } from 'mobx';
import { render } from './render';

type ReadonlyArrayInnerType<T> = T extends ReadonlyArray<(infer U)> ? U : never;
type ArrayFieldInnerType<T> = T extends IArrayField<(infer U)> ? U : never;

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
    if (baseTypeMetadata.properties) {
        properties = {
            ...baseTypeMetadata.properties
        };
    }
    if (derrivedTypeMetadata.properties) {
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

}
class StateModelNode implements IStateModelNode {
    constructor(protected $parent: IStateModelNode) {
    }
}
type FieldType = {

}
interface IField extends FieldType {

}
interface IValueField<TValue> extends IField {
    value: TValue;
}

class ValueField<TValue> extends StateModelNode implements IValueField<TValue> {
    @observable value: TValue;
}

interface ITextField extends IValueField<string> {
}

class TextField extends ValueField<string> implements ITextField {

}
interface IComplexType {
}
class ComplexType implements IComplexType {
    constructor() {
        let metadata = this.getMetadata();
        if (!metadata) {
            throw new Error("A complex type needs to defina a static property metadata of type IComplexTypeMetadata: " + this.constructor.name);
        }
    }
    getMetadata(): IComplexTypeMetadata {
        return (this.constructor as any).metaData as IComplexTypeMetadata;
    }
    applyMetadata() {
        console.log(this, this.getMetadata());
    }
}

interface IComplexField<TComplexType extends IComplexType> extends IField {
    readonly value: TComplexType;
    getItemMetadata(): IComplexTypeMetadata;
}

class ComplexField<TComplexType extends IComplexType> extends StateModelNode implements IComplexField<TComplexType> {
    constructor(parent: IStateModelNode, private _itemCtor: new () => TComplexType) {
        super(parent);
        this.value = new _itemCtor();
        (this.value as any).applyMetadata();
    }
    public getItemMetadata(): IComplexTypeMetadata {
        return (this._itemCtor as any).metaData as IComplexTypeMetadata;
    }
    @observable readonly value: TComplexType;
}

interface IArrayField<TComplexType extends IComplexType> extends IField {
    readonly items: ReadonlyArray<TComplexType>;
    getItemsMetadata(): IComplexTypeMetadata;
    append(item?: TComplexType): TComplexType;
}

class ArrayField<TComplexType extends IComplexType> extends StateModelNode implements IArrayField<TComplexType> {
    constructor($parent: IStateModelNode, private _itemCtor: new () => TComplexType) {
        super($parent);
    }
    @observable private _items = [];
    @computed get items(): ReadonlyArray<TComplexType> {
        return this._items;
    }
    public append(item?: TComplexType): TComplexType {
        if (item == null) {
            item = new this._itemCtor();
            (item as any).applyMetadata();
        }
        this._items.push(item);
        return item;
    }
    public getItemsMetadata(): IComplexTypeMetadata {
        return (this._itemCtor as any).metaData as IComplexTypeMetadata;
    }
}

interface IAddress extends IComplexType {
    readonly line1: ITextField;
}

class Address extends ComplexType implements IAddress {
    static metaData = {
        name: "Address"
    };
    @observable line1: ITextField = new TextField(this);
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

    @observable readonly line2 = new TextField(this);
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
    @observable name: ITextField = new TextField(this);
    @observable address: IComplexField<IAddress> = new ComplexField(this, Address);
    @observable addresses: IArrayField<IAddress> = new ArrayField(this, Address);
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
    @observable readonly matchcode: ITextField = new TextField(this);
    @observable readonly address: IComplexField<IExtendedAddress> = new ComplexField(this, ExtendedAddress);
    @observable readonly addresses: IArrayField<IExtendedAddress> = new ArrayField(this, ExtendedAddress);
}

class ListDetailViewModel<TListType extends IComplexType, TDetailType extends IComplexType> extends ComplexType {
    static metaData: IComplexTypeMetadata = {
        name: "ListDetailViewModel"
    };

    constructor(listCtor: new () => TListType, detailCtor: new () => TDetailType) {
        super();
        this.detail = new ComplexField(this, detailCtor);
        this.items = new ArrayField<TListType>(this, listCtor);
    }
    @observable items: IArrayField<TListType>;
    @observable detail: IComplexField<TDetailType>;
}

class ListDetailView<TL extends IComplexType, TD extends IComplexType> {
    constructor(listCtor: new () => TL, detailCtor: new () => TD) {
        this.model = new ListDetailViewModel(listCtor, detailCtor);
    }
    model: ListDetailViewModel<TL, TD>;
}


new ListDetailView(Customer, SpecialCustomer);

const customer = new SpecialCustomer();
//console.log(customer);
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
    if (num % 2 == 0) {
        let a = new ExtendedAddress();
        a.line1.value = "number: " + num;
        customer.addresses.append(a);
    } else {
        let a = customer.addresses.append();
        a.line1.value = "number: " + num;
    }
    type a = ReadonlyArrayInnerType<typeof customer.addresses.items>;
    type b = ArrayFieldInnerType<typeof customer.addresses>;
    let x: b;
}, 3000)
console.log(customer.getMetadata())
console.log(customer.address.getItemMetadata());
console.log(customer.addresses.getItemsMetadata());

render(customer);