import { ComplexType, field } from "./m/complexType";
import { TextField } from "./m/textField";
import { BooleanField } from "./m/booleanField";
import { ComplexField } from "./m/complexField";
import { ReferenceField } from "./m/referenceField";
import { ArrayField } from "./m/arrayField";

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