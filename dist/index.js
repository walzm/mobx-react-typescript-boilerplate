var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed, isObservable } from 'mobx';
import { render } from './render';
const field = observable;
function extendComplexTypeMetadata(baseTypeMetadata, derrivedTypeMetadata) {
    let properties = {};
    if (baseTypeMetadata && baseTypeMetadata.properties) {
        properties = Object.assign({}, baseTypeMetadata.properties);
    }
    if (derrivedTypeMetadata && derrivedTypeMetadata.properties) {
        properties = Object.assign({}, properties, derrivedTypeMetadata.properties);
    }
    return {
        name: derrivedTypeMetadata.name,
        properties: properties
    };
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
    }
    fireOnValueChanged(value, oldValue) {
    }
}
__decorate([
    observable
], ValueField.prototype, "value", void 0);
class TextField extends ValueField {
}
class ComplexType extends StateModelNode {
    constructor() {
        super();
        let metadata = this.getMetadata();
        if (!metadata) {
            throw new Error("A complex type needs to defina a static property metadata of type IComplexTypeMetadata: " + this.constructor.name);
        }
    }
    getMetadata() {
        return this.constructor.metaData;
    }
    init() {
        this.initFields();
        this.initStaticMetadata();
    }
    initStaticMetadata() {
    }
    initFields() {
        Object.getOwnPropertyNames(this).forEach((propertyName) => {
            let propertyValue = this[propertyName];
            if (isObservable(propertyValue)) {
                propertyValue.fieldName = propertyName;
                propertyValue.$parent = this;
            }
        });
    }
}
class ComplexField extends Field {
    constructor(_itemCtor) {
        super();
        this._itemCtor = _itemCtor;
        this.value = new _itemCtor();
        this.value.$parent = this;
        this.value.init();
    }
    getItemMetadata() {
        return this._itemCtor.metaData;
    }
}
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
            item = new this._itemCtor();
            item.$parent = this;
            item.init();
        }
        this._items.push(item);
        return item;
    }
    getItemsMetadata() {
        return this._itemCtor.metaData;
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
Address.metaData = {
    name: "Address"
};
__decorate([
    field
], Address.prototype, "line1", void 0);
class ExtendedAddress extends Address {
    constructor() {
        super(...arguments);
        this.line2 = new TextField();
    }
}
ExtendedAddress.metaData = extendComplexTypeMetadata(Address.metaData, {
    name: "ExtendedAddress",
    properties: {
        line1: {
            label: "abc"
        }
    }
});
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
Customer.metaData = {
    name: "Customer",
    properties: {
        name
    }
};
__decorate([
    field
], Customer.prototype, "name", void 0);
__decorate([
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
SpecialCustomer.metaData = extendComplexTypeMetadata(Customer.metaData, {
    name: "SpecialCustomer"
});
__decorate([
    field
], SpecialCustomer.prototype, "matchcode", void 0);
__decorate([
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
ListDetailViewModel.metaData = {
    name: "ListDetailViewModel"
};
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
