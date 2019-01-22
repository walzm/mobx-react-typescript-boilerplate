import { CustomerTransportModel } from "./customerData";
import { field, ComplexType, createModelInstance, createModelContext, IComplexType, IModelContext } from "./m/complexType";
import { TextField } from "./m/textField";
import { BooleanField } from "./m/booleanField";
import { ComplexField, IComplexField } from "./m/complexField";
import { ReferenceField } from "./m/referenceField";
import { ArrayField } from "./m/arrayField";
import { autorun } from "mobx";

export class Address extends ComplexType {
    @field({
        label: { "de-DE": "Stadt", "en-GB": "City" },
        maxLength: 100,
        shortLabel: { "de-DE": "Stadt", "en-GB": "City" }
    })
    city = new TextField();
    @field({
        label: { "de-DE": "Ländercode", "en-GB": "CountryCode" },
        maxLength: 2,
        minLength: 2,
        required: true,
        shortLabel: { "de-DE": "Ländercode", "en-GB": "CountryC." }
    })
    countryCode = new TextField();
    @field({
        label: { "de-DE": "Land", "en-GB": "Country" },
        readOnly: true,
        shortLabel: { "de-DE": "Land", "en-GB": "Country" }
    })
    countryName = new TextField();
    @field({
        label: { "de-DE": "Hausnummer", "en-GB": "House number" },
        maxLength: 10,
        shortLabel: { "de-DE": "Hausnr.", "en-GB": "House no." }
    })
    houseNumber = new TextField();
    @field({
        label: { "de-DE": "", "en-GB": "" },
        required: true,
        shortLabel: { "de-DE": "", "en-GB": "" }
    })
    isVatIdValid = new BooleanField();
    @field({
        label: { "de-DE": "Erste Zeile", "en-GB": "First line" },
        maxLength: 100,
        required: true,
        shortLabel: { "de-DE": "Erste Zeile", "en-GB": "1st line" }
    })
    line1 = new TextField();
    @field({
        label: { "de-DE": "Zweite Zeile", "en-GB": "Second line" },
        maxLength: 100,
        shortLabel: { "de-DE": "Zweite Zeile", "en-GB": "2nd line" }
    })
    line2 = new TextField();
    @field({
        label: { "de-DE": "Dritte Zeile", "en-GB": "Third line" },
        maxLength: 100,
        shortLabel: { "de-DE": "Dritte Zeile", "en-GB": "3th line" }
    })
    line3 = new TextField();
    @field({
        label: { "de-DE": "Straße", "en-GB": "Street" },
        maxLength: 100,
        shortLabel: { "de-DE": "Str.", "en-GB": "Str." }
    })
    street = new TextField();
    @field({
        label: { "de-DE": "USt-IdNr.", "en-GB": "VatId" },
        shortLabel: { "de-DE": "USt-IdNr.", "en-GB": "VatId" }
    })
    vatId = new TextField();
    @field({
        label: { "de-DE": "Postleitzahl", "en-GB": "Zipcode" },
        maxLength: 10,
        shortLabel: { "de-DE": "PLZ", "en-GB": "Zip" }
    })
    zipcode = new TextField();
}

export class CustomerAddress extends ComplexType {
    @field({
        label: { "de-DE": "Adr.", "en-GB": "Add." },
        shortLabel: { "de-DE": "Adresse", "en-GB": "Address" }
    })
    address = new ComplexField(Address);
    @field({
        label: { "de-DE": "Adresse", "en-GB": "Address" },
        serviceName: "address",
        shortLabel: { "de-DE": "Adr.", "en-GB": "Add." }
    })
    addressReference = new ReferenceField();
    @field({
        label: { "de-DE": " Kunden-ID", "en-GB": "Customer ID" },
        serviceName: "customer",
        shortLabel: { "de-DE": " Kunden-ID", "en-GB": "Customer ID" }
    })
    customerReference = new ReferenceField();
    @field({
        label: { "de-DE": "Lieferbedingung", "en-GB": "Delivery term" },
        serviceName: "deliveryTerm",
        shortLabel: { "de-DE": "Lief.Bed.", "en-GB": "Delivery term" }
    })
    deliveryTermReference = new ReferenceField();
    @field({
        label: { "de-DE": "", "en-GB": "" },
        required: true,
        shortLabel: { "de-DE": "", "en-GB": "" }
    })
    isBillingAddress = new BooleanField()
    @field({
        label: { "de-DE": "Standard Rechnungsadresse", "en-GB": "Default billing address" },
        required: true,
        shortLabel: { "de-DE": "Std. Rechn. Adr.", "en-GB": "Def. bill. addr." }
    })
    isDefaultBillingAddress = new BooleanField()
    @field({
        label: { "de-DE": "Standard Lieferadresse", "en-GB": "Default delivery address" },
        required: true,
        shortLabel: { "de-DE": "Std. Lief. Adr.", "en-GB": "Def. deliv. addr." }
    })
    isDefaultDeliveryAddress = new BooleanField()
    @field({
        label: { "de-DE": "Standard Hausadresse", "en-GB": "Default house address" },
        required: true,
        shortLabel: { "de-DE": "Std. Haus Adr.", "en-GB": "Def. house addr." }
    })
    isDefaultHouseAddress = new BooleanField()
    @field({
        label: { "de-DE": "Lieferadresse", "en-GB": "Delivery address" },
        required: true,
        shortLabel: { "de-DE": "Lief. Adr.", "en-GB": "Deliv. add." }
    })
    isDeliveryAddress = new BooleanField()
    @field({
        label: { "de-DE": "Hausadresse", "en-GB": "House address" },
        required: true,
        shortLabel: { "de-DE": "Haus Adr.", "en-GB": "House addr." }
    })
    isHouseAddress = new BooleanField()
    @field({
        label: { "de-DE": "Bezeichnung", "en-GB": "Label" },
        shortLabel: { "de-DE": "Bez.", "en-GB": "Label" }
    })
    label = new TextField()
}
export class Customer extends ComplexType {
    @field({
        label: { "de-DE": "Adressen", "en-GB": "Addresses" },
        shortLabel: { "de-DE": "Adressen", "en-GB": "Addresses" }
    })
    addresses = new ArrayField(CustomerAddress);
    @field({
        label: { "de-DE": "", "en-GB": "" },
        required: true,
        shortLabel: { "de-DE": "", "en-GB": "" }
    })
    label = new TextField();
    @field({
        label: { "de-DE": "Mandant", "en-GB": "Mandator" },
        serviceName: "mandator",
        shortLabel: { "de-DE": "Mandant", "en-GB": "Mandator" }
    })
    mandatorReference = new ReferenceField();
    @field({
        label: { "de-DE": "Matchcode", "en-GB": "Matchcode" },
        maxLength: 50,
        required: true,
        shortLabel: { "de-DE": "Matchcode", "en-GB": "Matchcode" }
    })
    matchcode = new TextField();
    @field({
        label: { "de-DE": "Kundennummer", "en-GB": "Customer number" },
        readOnly: true,
        shortLabel: { "de-DE": "Nr", "en-GB": "Customer no." }
    })
    number = new TextField();
    @field({
        label: { "de-DE": "Zahlungsbedingung", "en-GB": "Payment terms" },
        serviceName: "paymentterm",
        shortLabel: { "de-DE": "Zahl.Bed.", "en-GB": "Payment terms" }
    })
    paymentTermReference = new ReferenceField();
}

export class AddressExt extends Address {
    @field({
        readOnly: true,
        label: { "de-DE": "Gültig", "en-GB": "Valid" },
        shortLabel: { "de-DE": "Gültig", "en-GB": "Valid" }
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
/*
let log = null;

function measure(name: string, func: () => any) {
    let start = performance.now();
    console.log("----> " + name);
    //console.profile(name);
    let ret = func();
    //console.profileEnd();
    let end = performance.now();
    console.log("<--- " + (end - start) + "ms");
    return ret;
}
/*
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
//let tm2 = measure("write transport model 2", () => customer.writeTransportModel());

let counter = 0;

function hook(customer: CustomerExt) {
    log && log("hook start");
    counter = 0;
    autorun(() => {
        log && log("Addresses: " + customer.addresses.items.length);
        //console.log("Addresses: " + customer.addresses.items.length);
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
                        })
                    });
                } else {
                    perRow++;
                    autorun(() => {
                        let field = item[fieldName].state;
                        let val = field.value;
                        log && log(index + ": " + fieldName + ": " + val);
                        //console.log(index + ": " + fieldName + ": " + val);
                        counter++;
                    })
                }
            })
            //console.log(perRow);
        });
    });
    let perCustomer = 0;
    customer.getFieldNames().forEach((fieldName) => {
        perCustomer++;
        autorun(() => {
            let field = customer[fieldName].state;
            //console.log(field);
            let val = field.value;
            //console.log(val)
            counter++;
        })
    });
    //console.log(perCustomer);
    // autorun(() => {
    //     let val = customer.modified;
    //     log && log(val)
    // })
    log && log("hook end");
}
*/

let modelContext = createModelContext();

modelContext.onCreateInstance(CustomerExt, (instance) => {
    instance.onValueChanged("matchcode", (target, value, previousValue, propertyName) => {
        console.log("matchcode");
        console.log("Neu: " + value);
        console.log("Alt: " + previousValue);
    })
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


//customer2.matchcode.
/*
let customer2 = createModelInstance(CustomerExt, null, modelContext);
customer2.applyTransportModel(CustomerTransportModel);

console.log(customer2.addresses.items.map(item => Object.keys(item).filter(key => key.startsWith("is")).reduce((p, c) => { p[c] = item[c].getValue(); return p; }, {})));

autorun(() => console.log(customer2.matchcode.state.value));

customer2.matchcode.setValue("123", true);

customer2.addresses.items[1].isDefaultDeliveryAddress.setValue(true, true);
console.log(customer2.addresses.items.map(item => Object.keys(item).filter(key => key.startsWith("is")).reduce((p, c) => { p[c] = item[c].getValue(); return p; }, {})));
*/


class ModelBasedViewLogic<TModel extends ComplexType> extends ComplexType {
    constructor(protected modelCtor: new () => TModel) {
        super();
    }
    initViewLogic() {
        this.initModel();
    }
    initModel() {
        let modelContext = this.getModelContext();
        this.model = createModelInstance(this.modelCtor, null, modelContext);
    }
    getModelContext(): IModelContext {
        return null;
    }
    model: TModel;
}

class ListDetailEditModel<TListType extends IComplexType, TDetailType extends IComplexType> extends ComplexType {
    constructor(protected listItemCtor: new () => TListType, protected detailItemCtor: new () => TDetailType) {
        super();
    }
    @field()
    readonly list = new ArrayField(this.listItemCtor);
    @field()
    readonly detail = new ComplexField(this.detailItemCtor);
}

class ListDetailEditViewLogic<TListType extends IComplexType, TDetailType extends IComplexType> extends ModelBasedViewLogic<ListDetailEditModel<TListType, TDetailType>> {
    constructor(protected listItemCtor: new () => TListType, protected detailItemCtor: new () => TDetailType) {
        super(ListDetailEditModel.bind(ListDetailEditModel, listItemCtor, detailItemCtor));
    }
}

class CustomerEditViewLogic extends ListDetailEditViewLogic<CustomerExt, CustomerExt> {
}
let cev = new CustomerEditViewLogic(CustomerExt, CustomerExt);
cev.initViewLogic();
console.log(cev);

/*
measure("apply snapshot 1", () => customer2.applySnapshot(snap2));
measure("apply snapshot 2", () => customer2.applySnapshot(snap2));
hook(customer2);
measure("apply snapshot 3", () => customer2.applySnapshot(snap2));
log && log(counter);

customer2 = createModelInstance(CustomerExt);
/*
counter = 0;
//hook(customer2);
console.log("hooked");
measure("apply snapshot 4", () => customer2.applySnapshot(snap2));
log = console.log;
log && log(counter);
log && log(snap2)
log && log(customer2)

measure("update value", () => customer2.addresses.items[0].address.item.city.setValue("xx"));
log && log(counter);

measure("update value array", () => customer2.addresses.items[63].address.item.city.setValue("xx"));
log && log(counter);

/*
let org = customer2.addresses.items[4].address.item.line1.getValue();
measure("set value 1", () => {
    customer2.addresses.items[4].address.item.line1.setValue("hello")
});
log && log(counter);
measure("set value 2", () => {
    customer2.addresses.items[4].address.item.line1.setValue(org)
});
log && log(counter);

*/

/*
addr: 24 felder * 64 = 1536
kunde: 8 felder = 8
*/
/*
 aktuelle implementierung ohne hooks: 64 adressen
 no hooks
 70 ms

 mit hooks:
 180ms

 mit hooks production build:
 150ms

*/


/* Aktuelles model (MST)
 64 addresses
 mit ui hooks
apply snapshot from service: 2496.6000000022177ms
listDetailEditViewLogic.ts:373 update snapshot: 116.30000000150176ms

ohne ui hooks
apply snapshot: 369.30000000211294ms

prod mode:
apply snapshot: 280.30000000211294ms
*/