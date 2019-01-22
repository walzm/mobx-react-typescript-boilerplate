var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomerTransportModel } from "./customerData";
import { field, ComplexType, createModelInstance, createModelContext } from "./m/complexType";
import { TextField } from "./m/textField";
import { BooleanField } from "./m/booleanField";
import { ComplexField } from "./m/complexField";
import { ReferenceField } from "./m/referenceField";
import { ArrayField } from "./m/arrayField";
import { autorun } from "mobx";
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
let modelContext = createModelContext();
modelContext.onCreateInstance(CustomerExt, (instance) => {
    instance.onValueChanged("matchcode", (target, value, previousValue, propertyName) => {
        console.log("matchcode");
        console.log("Neu: " + value);
        console.log("Alt: " + previousValue);
    });
});
modelContext.onCreateInstance(CustomerAddressExt, (instance) => {
    instance.onValueChanged("isDefaultDeliveryAddress", (target, value, previousValue, propertyName) => {
        console.log("isDefaultDeliveryAddress");
        console.log("Neu: " + value);
        console.log("Alt: " + previousValue);
        if (value) {
            target.isDeliveryAddress.setValue(true);
            let customer = target.findClosest(CustomerExt);
            if (customer) {
                customer.addresses.items.filter(address => address !== target).forEach(address => address.isDefaultDeliveryAddress.setValue(false));
            }
        }
    });
});
let customer2 = createModelInstance(CustomerExt, null, modelContext);
customer2.applyTransportModel(CustomerTransportModel);
console.log(customer2.addresses.items.map(item => Object.keys(item).filter(key => key.startsWith("is")).reduce((p, c) => { p[c] = item[c].getValue(); return p; }, {})));
autorun(() => console.log(customer2.matchcode.state.value));
customer2.matchcode.setValue("123", true);
customer2.addresses.items[1].isDefaultDeliveryAddress.setValue(true, true);
console.log(customer2.addresses.items.map(item => Object.keys(item).filter(key => key.startsWith("is")).reduce((p, c) => { p[c] = item[c].getValue(); return p; }, {})));
class ModelBasedViewLogic extends ComplexType {
    constructor(modelCtor) {
        super();
        this.modelCtor = modelCtor;
        this.model = new ComplexField(this.modelCtor);
    }
}
class ListDetailEditModel extends ComplexType {
    constructor(listItemCtor, detailItemCtor) {
        super();
        this.listItemCtor = listItemCtor;
        this.detailItemCtor = detailItemCtor;
        this.list = new ArrayField(this.listItemCtor);
        this.detail = new ComplexField(this.detailItemCtor);
    }
}
class ListDetailModelEditView extends ModelBasedViewLogic {
    constructor(listItemCtor, detailItemCtor) {
        super(new ListDetailEditModel(listItemCtor, detailItemCtor));
        this.listItemCtor = listItemCtor;
        this.detailItemCtor = detailItemCtor;
    }
}
class CustomerEditView extends ListDetailModelEditView {
    constructor(listItemCtor, detailItemCtor) {
        super(listItemCtor, detailItemCtor);
        this.listItemCtor = listItemCtor;
        this.detailItemCtor = detailItemCtor;
    }
}
let cev = new CustomerEditView(CustomerExt, CustomerExt);
