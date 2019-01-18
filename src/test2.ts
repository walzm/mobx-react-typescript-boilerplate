import { ComplexType, ArrayField, field, IntegerField, TextField, ReferenceField, ComplexField, BooleanField, createModelInstance } from "./model";
import { CustomerTransportModel } from "./customerData";
import { autorun } from "mobx";
import { observer } from "mobx-react";

export class Address extends ComplexType {
    @field({
        label: { texts: { "de-DE": "Stadt", "en-GB": "City" } },
        maxLength: 100,
        shortLabel: { texts: { "de-DE": "Stadt", "en-GB": "City" } }
    })
    city = new TextField();
    @field({
        label: { texts: { "de-DE": "Ländercode", "en-GB": "CountryCode" } },
        maxLength: 2,
        minLength: 2,
        required: true,
        shortLabel: { texts: { "de-DE": "Ländercode", "en-GB": "CountryC." } }
    })
    countryCode = new TextField();
    @field({
        label: { texts: { "de-DE": "Land", "en-GB": "Country" } },
        readOnly: true,
        shortLabel: { texts: { "de-DE": "Land", "en-GB": "Country" } }
    })
    countryName = new TextField();
    @field({
        label: { texts: { "de-DE": "Hausnummer", "en-GB": "House number" } },
        maxLength: 10,
        shortLabel: { texts: { "de-DE": "Hausnr.", "en-GB": "House no." } }
    })
    houseNumber = new TextField();
    @field({
        label: { texts: { "de-DE": "", "en-GB": "" } },
        required: true,
        shortLabel: { texts: { "de-DE": "", "en-GB": "" } }
    })
    id = new IntegerField();
    @field({
        label: { texts: { "de-DE": "Gültigkeit USt-IdNr.", "en-GB": "Is VatId valid" } },
        shortLabel: { texts: { "de-DE": "Gültigkeit USt-IdNr.", "en-GB": "VatId valid" } }
    })
    isVatIdValid = new BooleanField();
    @field({
        label: { texts: { "de-DE": "Erste Zeile", "en-GB": "First line" } },
        maxLength: 100,
        required: true,
        shortLabel: { texts: { "de-DE": "Erste Zeile", "en-GB": "1st line" } }
    })
    line1 = new TextField();
    @field({
        label: { texts: { "de-DE": "Zweite Zeile", "en-GB": "Second line" } },
        maxLength: 100,
        shortLabel: { texts: { "de-DE": "Zweite Zeile", "en-GB": "2nd line" } }
    })
    line2 = new TextField();
    @field({
        label: { texts: { "de-DE": "Dritte Zeile", "en-GB": "Third line" } },
        maxLength: 100,
        shortLabel: { texts: { "de-DE": "Dritte Zeile", "en-GB": "3th line" } }
    })
    line3 = new TextField();
    @field({
        label: { texts: { "de-DE": "Straße", "en-GB": "Street" } },
        maxLength: 100,
        shortLabel: { texts: { "de-DE": "Str.", "en-GB": "Str." } }
    })
    street = new TextField();
    @field({
        label: { texts: { "de-DE": "USt-IdNr.", "en-GB": "VatId" } },
        shortLabel: { texts: { "de-DE": "USt-IdNr.", "en-GB": "VatId" } }
    })
    vatId = new TextField();
    @field({
        label: { texts: { "de-DE": "Postleitzahl", "en-GB": "Zipcode" } },
        maxLength: 10,
        shortLabel: { texts: { "de-DE": "PLZ", "en-GB": "Zip" } }
    })
    zipcode = new TextField();
}

export class CustomerAddress extends ComplexType {
    @field({
        label: { texts: { "de-DE": "Adr.", "en-GB": "Add." } },
        shortLabel: { texts: { "de-DE": "Adresse", "en-GB": "Address" } }
    })
    address = new ComplexField(Address);
    @field({
        label: { texts: { "de-DE": "Adresse", "en-GB": "Address" } },
        serviceName: "address",
        shortLabel: { texts: { "de-DE": "Adr.", "en-GB": "Add." } }
    })
    addressReference = new ReferenceField();
    @field({
        label: { texts: { "de-DE": " Kunden-ID", "en-GB": "Customer ID" } },
        serviceName: "customer",
        shortLabel: { texts: { "de-DE": " Kunden-ID", "en-GB": "Customer ID" } }
    })
    customerReference = new ReferenceField();
    @field({
        label: { texts: { "de-DE": "Lieferbedingung", "en-GB": "Delivery term" } },
        serviceName: "deliveryTerm",
        shortLabel: { texts: { "de-DE": "Lief.Bed.", "en-GB": "Delivery term" } }
    })
    deliveryTermReference = new ReferenceField();
    @field({
        label: { texts: { "de-DE": "", "en-GB": "" } },
        required: true,
        shortLabel: { texts: { "de-DE": "", "en-GB": "" } }
    })
    id = new IntegerField();
    @field({
        label: { texts: { "de-DE": "Rechnungsadresse", "en-GB": "Billing address" } },
        required: true,
        shortLabel: { texts: { "de-DE": "Rechn. Adr.", "en-GB": "Bill. address" } }
    })
    isBillingAddress = new BooleanField()
    @field({
        label: { texts: { "de-DE": "Standard Rechnungsadresse", "en-GB": "Default billing address" } },
        required: true,
        shortLabel: { texts: { "de-DE": "Std. Rechn. Adr.", "en-GB": "Def. bill. addr." } }
    })
    isDefaultBillingAddress = new BooleanField()
    @field({
        label: { texts: { "de-DE": "Standard Lieferadresse", "en-GB": "Default delivery address" } },
        required: true,
        shortLabel: { texts: { "de-DE": "Std. Lief. Adr.", "en-GB": "Def. deliv. addr." } }
    })
    isDefaultDeliveryAddress = new BooleanField()
    @field({
        label: { texts: { "de-DE": "Standard Hausadresse", "en-GB": "Default house address" } },
        required: true,
        shortLabel: { texts: { "de-DE": "Std. Haus Adr.", "en-GB": "Def. house addr." } }
    })
    isDefaultHouseAddress = new BooleanField()
    @field({
        label: { texts: { "de-DE": "Lieferadresse", "en-GB": "Delivery address" } },
        required: true,
        shortLabel: { texts: { "de-DE": "Lief. Adr.", "en-GB": "Deliv. add." } }
    })
    isDeliveryAddress = new BooleanField()
    @field({
        label: { texts: { "de-DE": "Hausadresse", "en-GB": "House address" } },
        required: true,
        shortLabel: { texts: { "de-DE": "Haus Adr.", "en-GB": "House addr." } }
    })
    isHouseAddress = new BooleanField()
    @field({
        label: { texts: { "de-DE": "Bezeichnung", "en-GB": "Label" } },
        shortLabel: { texts: { "de-DE": "Bez.", "en-GB": "Label" } }
    })
    label = new TextField()
}
export class Customer extends ComplexType {
    @field({
        label: { texts: { "de-DE": "Adressen", "en-GB": "Addresses" } },
        shortLabel: { texts: { "de-DE": "Adressen", "en-GB": "Addresses" } }
    })
    addresses = new ArrayField(CustomerAddress);
    @field({
        label: { texts: { "de-DE": "", "en-GB": "" } },
        required: true,
        shortLabel: { texts: { "de-DE": "", "en-GB": "" } }
    })
    id = new IntegerField();
    @field({
        label: { texts: { "de-DE": "Name", "en-GB": "Name" } },
        maxLength: 50,
        required: true,
        shortLabel: { texts: { "de-DE": "Name", "en-GB": "Name" } }
    })
    label = new TextField();
    @field({
        label: { texts: { "de-DE": "Mandant", "en-GB": "Mandator" } },
        serviceName: "mandator",
        shortLabel: { texts: { "de-DE": "Mandant", "en-GB": "Mandator" } }
    })
    mandatorReference = new ReferenceField();
    @field({
        label: { texts: { "de-DE": "Matchcode", "en-GB": "Matchcode" } },
        maxLength: 50,
        required: true,
        shortLabel: { texts: { "de-DE": "Matchcode", "en-GB": "Matchcode" } }
    })
    matchcode = new TextField();
    @field({
        label: { texts: { "de-DE": "Kundennummer", "en-GB": "Customer number" } },
        readOnly: true,
        shortLabel: { texts: { "de-DE": "Nr", "en-GB": "Customer no." } }
    })
    number = new TextField();
    @field({
        label: { texts: { "de-DE": "Zahlungsbedingung", "en-GB": "Payment terms" } },
        serviceName: "paymentterm",
        shortLabel: { texts: { "de-DE": "Zahl.Bed.", "en-GB": "Payment terms" } }
    })
    paymentTermReference = new ReferenceField();
}

export class AddressExt extends Address {
    @field({
        readOnly: true,
        label: { texts: { "de-DE": "Gültig", "en-GB": "Valid" } },
        shortLabel: { texts: { "de-DE": "Gültig", "en-GB": "Valid" } }
    })
    isVatIdValidText = new TextField();
}
export class CustomerAddressExt extends CustomerAddress {
    address = new ComplexField(AddressExt);
}
export class CustomerExt extends Customer {
    @field({
        canInsert: true,
        canDelete: true
    })
    addresses = new ArrayField(CustomerAddressExt);
}
let log = null;

function measure(name: string, func: () => any) {
    let start = performance.now();
    console.log("----> " + name);
    performance.mark(name);
    let ret = func();
    let end = performance.now();
    console.log("<--- " + (end - start) + "ms");
    return ret;
}
let customer = createModelInstance(CustomerExt);
let snap1 = measure("write snapshot 1", () => customer.writeSnapshot());
let tm1 = measure("write transport model 1", () => customer.writeTransportModel());

let model = JSON.parse(JSON.stringify(CustomerTransportModel));
for (let a = 0; a < 5; a++) {
    model.addresses = [...model.addresses, ...model.addresses];
}
log && log("Addresses: " + model.addresses.length);
customer.applyTransportModel(model);
customer.updateOriginalValue();
let snap2 = measure("write snapshot 2", () => customer.writeSnapshot());
//let tm2 = measure("write transport model 2", () => customer.writeTransportModel());

let counter = 0;

function hook(customer: CustomerExt) {
    log && log("hook start");
    counter = 0;
    autorun(() => {
        customer.addresses.items.forEach((item, index) => {
            item.getFieldNames().forEach((fieldName) => {
                if (fieldName === "address") {
                    item.address.value.getFieldNames().forEach((fieldName) => {
                        autorun(() => {
                            let val = item.address.value[fieldName].value;
                            //log && log(index + ": address." + fieldName + ": " + val);
                            counter++;
                        })
                    });
                } else {
                    autorun(() => {
                        let val = item[fieldName].value;
                        //log && log(index + ": " + fieldName + ": " + val);
                        counter++;
                    })
                }
            })
        });
    });
    customer.getFieldNames().forEach((fieldName) => {
        autorun(() => {
            let val = customer[fieldName].value;
            //log && log(fieldName + ": " + val);
            counter++;
        })
    });
    autorun(() => {
        let val = customer.modified;
        log && log(val)
    })
    log && log("hook end");
}
console.profile("label for profile");



let customer2 = createModelInstance(CustomerExt);
measure("apply snapshot 1", () => customer2.applySnapshot(snap2));
measure("apply snapshot 2", () => customer2.applySnapshot(snap2));
hook(customer2);
measure("apply snapshot 3", () => customer2.applySnapshot(snap2));
log && log(counter);
customer2 = createModelInstance(CustomerExt);
hook(customer2);
measure("apply snapshot 4", () => customer2.applySnapshot(snap2));
log && log(counter);
log && log(snap2)
log && log(customer2)
let org = customer2.addresses.items[4].address.value.line1.value;
measure("set value 1", () => {
    customer2.addresses.items[4].address.value.line1.value = "hello"
});
log && log(counter);
measure("set value 2", () => {
    customer2.addresses.items[4].address.value.line1.value = org
});
log && log(counter);

console.profileEnd();