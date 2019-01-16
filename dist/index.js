var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed, autorun } from 'mobx';
import { render } from './render';
import "reflect-metadata";
export const GW_METADATA_MODEL_FIELDS = Symbol();
function field(target, key, baseDescriptor) {
    let fields = Reflect.getOwnMetadata(GW_METADATA_MODEL_FIELDS, target);
    if (fields == null) {
        let baseTypeFields = Reflect.getMetadata(GW_METADATA_MODEL_FIELDS, target);
        if (baseTypeFields) {
            fields = [...baseTypeFields, key];
        }
        else {
            fields = [key];
        }
        Reflect.defineMetadata(GW_METADATA_MODEL_FIELDS, fields, target);
    }
    else if (fields.indexOf(key) < 0) {
        fields.push(key);
    }
    return observable(target, key, baseDescriptor);
}
class StateModelNode {
}
class Field extends StateModelNode {
}
class ValueField extends Field {
    setValue(value) {
        let oldValue = this.value;
        this.value = value;
        if (value !== oldValue) {
            this.fireOnValueChanged(value, oldValue);
        }
        return oldValue;
    }
    get modified() {
        return this.value !== this.originalValue;
    }
    fireOnValueChanged(value, oldValue) {
    }
    updateOriginalValue() {
        this.originalValue = this.value;
    }
}
__decorate([
    observable
], ValueField.prototype, "value", void 0);
__decorate([
    observable
], ValueField.prototype, "originalValue", void 0);
__decorate([
    computed
], ValueField.prototype, "modified", null);
class TextField extends ValueField {
}
class IntegerField extends ValueField {
}
class ComplexType extends StateModelNode {
    constructor() {
        super();
        this.id = new IntegerField();
    }
    init() {
        this.initFields();
    }
    initFields() {
        let fieldNames = this.getFieldNames();
        fieldNames.forEach((propertyName) => {
            let propertyValue = this[propertyName];
            propertyValue.$parent = this;
        });
    }
    getFieldNames() {
        return Reflect.getMetadata(GW_METADATA_MODEL_FIELDS, this);
    }
    get modified() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].modified;
        }));
    }
    updateOriginalValue() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].updateOriginalValue();
        }));
    }
}
__decorate([
    field
], ComplexType.prototype, "id", void 0);
__decorate([
    computed
], ComplexType.prototype, "modified", null);
class ComplexField extends Field {
    constructor(_itemCtor) {
        super();
        this._itemCtor = _itemCtor;
        this.value = new _itemCtor();
        this.value.$parent = this;
        this.value.init();
    }
    updateOriginalValue() {
        this.value.updateOriginalValue();
    }
    get modified() {
        return this.value.modified;
    }
}
__decorate([
    computed
], ComplexField.prototype, "modified", null);
__decorate([
    field
], ComplexField.prototype, "value", void 0);
class ArrayField extends Field {
    constructor(_itemCtor) {
        super();
        this._itemCtor = _itemCtor;
        this._items = [];
    }
    get items() {
        return this._items;
    }
    append(item) {
        if (item == null) {
            let ctor = this._itemCtor;
            item = new ctor();
            item.$parent = this;
            item.init();
        }
        this._items.push(item);
        return item;
    }
    updateOriginalValue() {
    }
}
__decorate([
    field
], ArrayField.prototype, "_items", void 0);
__decorate([
    computed
], ArrayField.prototype, "items", null);
class Address extends ComplexType {
    constructor() {
        super(...arguments);
        this.line1 = new TextField();
    }
}
__decorate([
    field
], Address.prototype, "line1", void 0);
class ExtendedAddress extends Address {
    constructor() {
        super(...arguments);
        this.line2 = new TextField();
    }
}
__decorate([
    field
], ExtendedAddress.prototype, "line2", void 0);
class Customer extends ComplexType {
    constructor() {
        super(...arguments);
        this.name = new TextField();
        this.address = new ComplexField(Address);
        this.addresses = new ArrayField(Address);
    }
}
__decorate([
    Reflect.metadata("test", "Hello"),
    field
], Customer.prototype, "name", void 0);
__decorate([
    Reflect.metadata("test", "Hello Base"),
    field
], Customer.prototype, "address", void 0);
__decorate([
    field
], Customer.prototype, "addresses", void 0);
class SpecialCustomer extends Customer {
    constructor() {
        super(...arguments);
        this.matchcode = new TextField();
        this.address = new ComplexField(ExtendedAddress);
        this.addresses = new ArrayField(ExtendedAddress);
    }
}
__decorate([
    field
], SpecialCustomer.prototype, "matchcode", void 0);
__decorate([
    Reflect.metadata("test", "Hello Derived"),
    field
], SpecialCustomer.prototype, "address", void 0);
__decorate([
    field
], SpecialCustomer.prototype, "addresses", void 0);
class ListDetailViewModel extends ComplexType {
    constructor(listCtor, detailCtor) {
        super();
        this.detail = new ComplexField(detailCtor);
        this.items = new ArrayField(listCtor);
    }
}
__decorate([
    field
], ListDetailViewModel.prototype, "items", void 0);
__decorate([
    field
], ListDetailViewModel.prototype, "detail", void 0);
class ListDetailView {
    constructor(listCtor, detailCtor) {
        this.model = new ListDetailViewModel(listCtor, detailCtor);
    }
}
new ListDetailView(Customer, SpecialCustomer);
const customer = new SpecialCustomer();
customer.init();
console.log(customer.getFieldNames());
console.log(customer.address.value.getFieldNames());
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
console.log(customer);
render(customer);
