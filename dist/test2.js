var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomerTransportModel } from "./customerData";
import { autorun } from "mobx";
import { field, ComplexType, createModelInstance } from "./m/complexType";
import { TextField } from "./m/textField";
import { BooleanField } from "./m/booleanField";
import { ComplexField } from "./m/complexField";
import { ReferenceField } from "./m/referenceField";
import { ArrayField } from "./m/arrayField";
export class Address extends ComplexType {
    constructor() {
        super(...arguments);
        this.city = new TextField();
        this.countryCode = new TextField();
        this.countryName = new TextField();
        this.houseNumber = new TextField();
        this.isVatIdValid = new BooleanField();
        this.line1 = new TextField();
        this.line2 = new TextField();
        this.line3 = new TextField();
        this.street = new TextField();
        this.vatId = new TextField();
        this.zipcode = new TextField();
    }
}
__decorate([
    field({
        label: { "de-DE": "Stadt", "en-GB": "City" },
        maxLength: 100,
        shortLabel: { "de-DE": "Stadt", "en-GB": "City" }
    })
], Address.prototype, "city", void 0);
__decorate([
    field({
        label: { "de-DE": "Ländercode", "en-GB": "CountryCode" },
        maxLength: 2,
        minLength: 2,
        required: true,
        shortLabel: { "de-DE": "Ländercode", "en-GB": "CountryC." }
    })
], Address.prototype, "countryCode", void 0);
__decorate([
    field({
        label: { "de-DE": "Land", "en-GB": "Country" },
        readOnly: true,
        shortLabel: { "de-DE": "Land", "en-GB": "Country" }
    })
], Address.prototype, "countryName", void 0);
__decorate([
    field({
        label: { "de-DE": "Hausnummer", "en-GB": "House number" },
        maxLength: 10,
        shortLabel: { "de-DE": "Hausnr.", "en-GB": "House no." }
    })
], Address.prototype, "houseNumber", void 0);
__decorate([
    field({
        label: { "de-DE": "", "en-GB": "" },
        required: true,
        shortLabel: { "de-DE": "", "en-GB": "" }
    })
], Address.prototype, "isVatIdValid", void 0);
__decorate([
    field({
        label: { "de-DE": "Erste Zeile", "en-GB": "First line" },
        maxLength: 100,
        required: true,
        shortLabel: { "de-DE": "Erste Zeile", "en-GB": "1st line" }
    })
], Address.prototype, "line1", void 0);
__decorate([
    field({
        label: { "de-DE": "Zweite Zeile", "en-GB": "Second line" },
        maxLength: 100,
        shortLabel: { "de-DE": "Zweite Zeile", "en-GB": "2nd line" }
    })
], Address.prototype, "line2", void 0);
__decorate([
    field({
        label: { "de-DE": "Dritte Zeile", "en-GB": "Third line" },
        maxLength: 100,
        shortLabel: { "de-DE": "Dritte Zeile", "en-GB": "3th line" }
    })
], Address.prototype, "line3", void 0);
__decorate([
    field({
        label: { "de-DE": "Straße", "en-GB": "Street" },
        maxLength: 100,
        shortLabel: { "de-DE": "Str.", "en-GB": "Str." }
    })
], Address.prototype, "street", void 0);
__decorate([
    field({
        label: { "de-DE": "USt-IdNr.", "en-GB": "VatId" },
        shortLabel: { "de-DE": "USt-IdNr.", "en-GB": "VatId" }
    })
], Address.prototype, "vatId", void 0);
__decorate([
    field({
        label: { "de-DE": "Postleitzahl", "en-GB": "Zipcode" },
        maxLength: 10,
        shortLabel: { "de-DE": "PLZ", "en-GB": "Zip" }
    })
], Address.prototype, "zipcode", void 0);
export class CustomerAddress extends ComplexType {
    constructor() {
        super(...arguments);
        this.address = new ComplexField(Address);
        this.addressReference = new ReferenceField();
        this.customerReference = new ReferenceField();
        this.deliveryTermReference = new ReferenceField();
        this.isBillingAddress = new BooleanField();
        this.isDefaultBillingAddress = new BooleanField();
        this.isDefaultDeliveryAddress = new BooleanField();
        this.isDefaultHouseAddress = new BooleanField();
        this.isDeliveryAddress = new BooleanField();
        this.isHouseAddress = new BooleanField();
        this.label = new TextField();
    }
}
__decorate([
    field({
        label: { "de-DE": "Adr.", "en-GB": "Add." },
        shortLabel: { "de-DE": "Adresse", "en-GB": "Address" }
    })
], CustomerAddress.prototype, "address", void 0);
__decorate([
    field({
        label: { "de-DE": "Adresse", "en-GB": "Address" },
        serviceName: "address",
        shortLabel: { "de-DE": "Adr.", "en-GB": "Add." }
    })
], CustomerAddress.prototype, "addressReference", void 0);
__decorate([
    field({
        label: { "de-DE": " Kunden-ID", "en-GB": "Customer ID" },
        serviceName: "customer",
        shortLabel: { "de-DE": " Kunden-ID", "en-GB": "Customer ID" }
    })
], CustomerAddress.prototype, "customerReference", void 0);
__decorate([
    field({
        label: { "de-DE": "Lieferbedingung", "en-GB": "Delivery term" },
        serviceName: "deliveryTerm",
        shortLabel: { "de-DE": "Lief.Bed.", "en-GB": "Delivery term" }
    })
], CustomerAddress.prototype, "deliveryTermReference", void 0);
__decorate([
    field({
        label: { "de-DE": "", "en-GB": "" },
        required: true,
        shortLabel: { "de-DE": "", "en-GB": "" }
    })
], CustomerAddress.prototype, "isBillingAddress", void 0);
__decorate([
    field({
        label: { "de-DE": "Standard Rechnungsadresse", "en-GB": "Default billing address" },
        required: true,
        shortLabel: { "de-DE": "Std. Rechn. Adr.", "en-GB": "Def. bill. addr." }
    })
], CustomerAddress.prototype, "isDefaultBillingAddress", void 0);
__decorate([
    field({
        label: { "de-DE": "Standard Lieferadresse", "en-GB": "Default delivery address" },
        required: true,
        shortLabel: { "de-DE": "Std. Lief. Adr.", "en-GB": "Def. deliv. addr." }
    })
], CustomerAddress.prototype, "isDefaultDeliveryAddress", void 0);
__decorate([
    field({
        label: { "de-DE": "Standard Hausadresse", "en-GB": "Default house address" },
        required: true,
        shortLabel: { "de-DE": "Std. Haus Adr.", "en-GB": "Def. house addr." }
    })
], CustomerAddress.prototype, "isDefaultHouseAddress", void 0);
__decorate([
    field({
        label: { "de-DE": "Lieferadresse", "en-GB": "Delivery address" },
        required: true,
        shortLabel: { "de-DE": "Lief. Adr.", "en-GB": "Deliv. add." }
    })
], CustomerAddress.prototype, "isDeliveryAddress", void 0);
__decorate([
    field({
        label: { "de-DE": "Hausadresse", "en-GB": "House address" },
        required: true,
        shortLabel: { "de-DE": "Haus Adr.", "en-GB": "House addr." }
    })
], CustomerAddress.prototype, "isHouseAddress", void 0);
__decorate([
    field({
        label: { "de-DE": "Bezeichnung", "en-GB": "Label" },
        shortLabel: { "de-DE": "Bez.", "en-GB": "Label" }
    })
], CustomerAddress.prototype, "label", void 0);
export class Customer extends ComplexType {
    constructor() {
        super(...arguments);
        this.addresses = new ArrayField(CustomerAddress);
        this.label = new TextField();
        this.mandatorReference = new ReferenceField();
        this.matchcode = new TextField();
        this.number = new TextField();
        this.paymentTermReference = new ReferenceField();
    }
}
__decorate([
    field({
        label: { "de-DE": "Adressen", "en-GB": "Addresses" },
        shortLabel: { "de-DE": "Adressen", "en-GB": "Addresses" }
    })
], Customer.prototype, "addresses", void 0);
__decorate([
    field({
        label: { "de-DE": "", "en-GB": "" },
        required: true,
        shortLabel: { "de-DE": "", "en-GB": "" }
    })
], Customer.prototype, "label", void 0);
__decorate([
    field({
        label: { "de-DE": "Mandant", "en-GB": "Mandator" },
        serviceName: "mandator",
        shortLabel: { "de-DE": "Mandant", "en-GB": "Mandator" }
    })
], Customer.prototype, "mandatorReference", void 0);
__decorate([
    field({
        label: { "de-DE": "Matchcode", "en-GB": "Matchcode" },
        maxLength: 50,
        required: true,
        shortLabel: { "de-DE": "Matchcode", "en-GB": "Matchcode" }
    })
], Customer.prototype, "matchcode", void 0);
__decorate([
    field({
        label: { "de-DE": "Kundennummer", "en-GB": "Customer number" },
        readOnly: true,
        shortLabel: { "de-DE": "Nr", "en-GB": "Customer no." }
    })
], Customer.prototype, "number", void 0);
__decorate([
    field({
        label: { "de-DE": "Zahlungsbedingung", "en-GB": "Payment terms" },
        serviceName: "paymentterm",
        shortLabel: { "de-DE": "Zahl.Bed.", "en-GB": "Payment terms" }
    })
], Customer.prototype, "paymentTermReference", void 0);
export class AddressExt extends Address {
    constructor() {
        super(...arguments);
        this.isVatIdValidText = new TextField();
    }
}
__decorate([
    field({
        readOnly: true,
        label: { "de-DE": "Gültig", "en-GB": "Valid" },
        shortLabel: { "de-DE": "Gültig", "en-GB": "Valid" }
    })
], AddressExt.prototype, "isVatIdValidText", void 0);
export class CustomerAddressExt extends CustomerAddress {
    constructor() {
        super(...arguments);
        this.address = new ComplexField(AddressExt);
    }
}
export class CustomerExt extends Customer {
    constructor() {
        super(...arguments);
        this.addresses = new ArrayField(CustomerAddressExt);
    }
}
__decorate([
    field({
        canInsert: true,
        canDelete: true
    })
], CustomerExt.prototype, "addresses", void 0);
let log = null;
function measure(name, func) {
    let start = performance.now();
    console.log("----> " + name);
    let ret = func();
    let end = performance.now();
    console.log("<--- " + (end - start) + "ms");
    return ret;
}
let customer = createModelInstance(CustomerExt);
let snap1 = measure("write empty snapshot 1", () => customer.writeSnapshot());
let tm1 = measure("write empty transport model 1", () => customer.writeTransportModel());
measure("apply default tm", () => customer.applyTransportModel(CustomerTransportModel));
console.log(customer);
tm1 = measure("write default tm", () => customer.writeTransportModel());
console.log(tm1);
let model = JSON.parse(JSON.stringify(CustomerTransportModel));
for (let a = 0; a < 5; a++) {
    model.addresses = [...model.addresses, ...model.addresses];
}
log && log("Addresses: " + model.addresses.length);
customer.applyTransportModel(model);
customer.updateOriginalValue();
let snap2 = measure("write snapshot 2", () => customer.writeSnapshot());
let counter = 0;
function hook(customer) {
    log && log("hook start");
    counter = 0;
    autorun(() => {
        log && log("Addresses: " + customer.addresses.items.length);
        customer.addresses.items.forEach((item, index) => {
            let perRow = 0;
            item.getFieldNames().forEach((fieldName) => {
                if (fieldName === "address") {
                    item.address.item.getFieldNames().forEach((fieldName) => {
                        perRow++;
                        autorun(() => {
                            let field = item.address.item[fieldName].state;
                            let val = field.value;
                            log && log(index + ": address." + fieldName + ": " + val);
                            counter++;
                        });
                    });
                }
                else {
                    perRow++;
                    autorun(() => {
                        let field = item[fieldName].state;
                        let val = field.value;
                        log && log(index + ": " + fieldName + ": " + val);
                        counter++;
                    });
                }
            });
        });
    });
    let perCustomer = 0;
    customer.getFieldNames().forEach((fieldName) => {
        perCustomer++;
        autorun(() => {
            let field = customer[fieldName].state;
            let val = field.value;
            counter++;
        });
    });
    log && log("hook end");
}
let customer2 = createModelInstance(CustomerExt);
counter = 0;
hook(customer2);
console.log("hooked");
measure("apply snapshot 4", () => customer2.applySnapshot(snap2));
log = console.log;
log && log(counter);
log && log(snap2);
log && log(customer2);
measure("update value", () => customer2.addresses.items[0].address.item.city.setValue("xx"));
log && log(counter);
measure("update value array", () => customer2.addresses.items[63].address.item.city.setValue("xx"));
log && log(counter);
