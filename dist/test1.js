var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ComplexType, field, TextField, ComplexField, ArrayField, GW_METADATA_MODEL_FIELD_METADATA } from './model';
import { autorun } from 'mobx';
import { render } from './render';
class Address extends ComplexType {
    constructor() {
        super(...arguments);
        this.line1 = new TextField();
    }
}
__decorate([
    field()
], Address.prototype, "line1", void 0);
class ExtendedAddress extends Address {
    constructor() {
        super(...arguments);
        this.line2 = new TextField();
    }
}
__decorate([
    field()
], ExtendedAddress.prototype, "line2", void 0);
class Customer extends ComplexType {
    constructor() {
        super(...arguments);
        this.name = new TextField();
        this.name2 = new TextField();
        this.address = new ComplexField(Address);
        this.addresses = new ArrayField(Address);
    }
}
__decorate([
    field({
        label: "Name"
    })
], Customer.prototype, "name", void 0);
__decorate([
    field({
        label: "Name2"
    })
], Customer.prototype, "name2", void 0);
__decorate([
    field({
        label: "Addresse"
    })
], Customer.prototype, "address", void 0);
__decorate([
    field()
], Customer.prototype, "addresses", void 0);
class SpecialCustomer extends Customer {
    constructor() {
        super(...arguments);
        this.name2 = new TextField();
        this.matchcode = new TextField();
        this.address = new ComplexField(ExtendedAddress);
        this.addresses = new ArrayField(ExtendedAddress);
    }
}
__decorate([
    field({
        minLength: 5
    })
], SpecialCustomer.prototype, "name2", void 0);
__decorate([
    field({
        label: "Matchcode"
    })
], SpecialCustomer.prototype, "matchcode", void 0);
__decorate([
    field()
], SpecialCustomer.prototype, "address", void 0);
__decorate([
    field()
], SpecialCustomer.prototype, "addresses", void 0);
class ListDetailViewModel extends ComplexType {
    constructor(listCtor, detailCtor) {
        super();
        this.detail = new ComplexField(detailCtor);
        this.items = new ArrayField(listCtor);
    }
}
__decorate([
    field()
], ListDetailViewModel.prototype, "items", void 0);
__decorate([
    field()
], ListDetailViewModel.prototype, "detail", void 0);
class ListDetailView {
    constructor(listCtor, detailCtor) {
        this.model = new ListDetailViewModel(listCtor, detailCtor);
    }
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
}, 1000);
setTimeout(() => {
    customer.address.value.line1.value = "xxxx";
}, 2000);
setTimeout(() => {
}, 10000);
setInterval(() => {
    let num = customer.addresses.items.length;
    if (num > 0) {
        customer.addresses.items[num - 1].line1.value = "done";
    }
    let a = customer.addresses.append();
    a.line1.value = "number: " + num;
    a.line2.setValue(a.line1.value);
    let x;
}, 3000);
render(customer);
