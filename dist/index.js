var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed } from 'mobx';
import { render } from './render';
function extendComplexTypeMetadata(baseTypeMetadata, derrivedTypeMetadata) {
    let properties = {};
    if (baseTypeMetadata.properties) {
        properties = Object.assign({}, baseTypeMetadata.properties);
    }
    if (derrivedTypeMetadata.properties) {
        properties = Object.assign({}, properties, derrivedTypeMetadata.properties);
    }
    return {
        name: derrivedTypeMetadata.name,
        properties: properties
    };
}
class StateModelNode {
    constructor($parent) {
        this.$parent = $parent;
    }
}
class ValueField extends StateModelNode {
}
__decorate([
    observable
], ValueField.prototype, "value", void 0);
class TextField extends ValueField {
}
class ComplexType {
    constructor() {
        let metadata = this.getMetadata();
        if (!metadata) {
            throw new Error("A complex type needs to defina a static property metadata of type IComplexTypeMetadata: " + this.constructor.name);
        }
    }
    getMetadata() {
        return this.constructor.metaData;
    }
    applyMetadata() {
        console.log(this, this.getMetadata());
    }
}
class ComplexField extends StateModelNode {
    constructor(parent, _itemCtor) {
        super(parent);
        this._itemCtor = _itemCtor;
        this.value = new _itemCtor();
        this.value.applyMetadata();
    }
    getItemMetadata() {
        return this._itemCtor.metaData;
    }
}
__decorate([
    observable
], ComplexField.prototype, "value", void 0);
class ArrayField extends StateModelNode {
    constructor($parent, _itemCtor) {
        super($parent);
        this._itemCtor = _itemCtor;
        this._items = [];
    }
    get items() {
        return this._items;
    }
    append(item) {
        if (item == null) {
            item = new this._itemCtor();
            item.applyMetadata();
        }
        this._items.push(item);
        return item;
    }
    getItemsMetadata() {
        return this._itemCtor.metaData;
    }
}
__decorate([
    observable
], ArrayField.prototype, "_items", void 0);
__decorate([
    computed
], ArrayField.prototype, "items", null);
class Address extends ComplexType {
    constructor() {
        super(...arguments);
        this.line1 = new TextField(this);
    }
}
Address.metaData = {
    name: "Address"
};
__decorate([
    observable
], Address.prototype, "line1", void 0);
class ExtendedAddress extends Address {
    constructor() {
        super(...arguments);
        this.line2 = new TextField(this);
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
    observable
], ExtendedAddress.prototype, "line2", void 0);
class Customer extends ComplexType {
    constructor() {
        super(...arguments);
        this.name = new TextField(this);
        this.address = new ComplexField(this, Address);
        this.addresses = new ArrayField(this, Address);
    }
}
Customer.metaData = {
    name: "Customer",
    properties: {
        name
    }
};
__decorate([
    observable
], Customer.prototype, "name", void 0);
__decorate([
    observable
], Customer.prototype, "address", void 0);
__decorate([
    observable
], Customer.prototype, "addresses", void 0);
class SpecialCustomer extends Customer {
    constructor() {
        super(...arguments);
        this.matchcode = new TextField(this);
        this.address = new ComplexField(this, ExtendedAddress);
        this.addresses = new ArrayField(this, ExtendedAddress);
    }
}
SpecialCustomer.metaData = extendComplexTypeMetadata(Customer.metaData, {
    name: "SpecialCustomer"
});
__decorate([
    observable
], SpecialCustomer.prototype, "matchcode", void 0);
__decorate([
    observable
], SpecialCustomer.prototype, "address", void 0);
__decorate([
    observable
], SpecialCustomer.prototype, "addresses", void 0);
class ListDetailViewModel extends ComplexType {
    constructor(listCtor, detailCtor) {
        super();
        this.detail = new ComplexField(this, detailCtor);
        this.items = new ArrayField(this, listCtor);
    }
}
ListDetailViewModel.metaData = {
    name: "ListDetailViewModel"
};
__decorate([
    observable
], ListDetailViewModel.prototype, "items", void 0);
__decorate([
    observable
], ListDetailViewModel.prototype, "detail", void 0);
class ListDetailView {
    constructor(listCtor, detailCtor) {
        this.model = new ListDetailViewModel(listCtor, detailCtor);
    }
}
new ListDetailView(Customer, SpecialCustomer);
const customer = new SpecialCustomer();
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
    if (num % 2 == 0) {
        let a = new ExtendedAddress();
        a.line1.value = "number: " + num;
        customer.addresses.append(a);
    }
    else {
        let a = customer.addresses.append();
        a.line1.value = "number: " + num;
    }
}, 3000);
console.log(customer.getMetadata());
console.log(customer.address.getItemMetadata());
console.log(customer.addresses.getItemsMetadata());
render(customer);
