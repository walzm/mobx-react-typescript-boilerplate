/*
import { IComplexType, ITextField, ComplexType, field, TextField, IComplexField, IArrayField, ComplexField, ArrayField, ReadonlyArrayInnerType, ArrayFieldInnerType, GW_METADATA_MODEL_FIELD_METADATA } from './model';
import { autorun } from 'mobx';
import { render } from './render';

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

render(customer);
*/