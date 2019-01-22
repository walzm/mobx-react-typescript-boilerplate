import { CustomerTransportModel } from "./customerData";
import { field, ComplexType, createModelInstance, createModelContext, IComplexType, IModelContext } from "./m/complexType";
import { TextField } from "./m/textField";
import { ComplexField, IComplexField } from "./m/complexField";
import { ArrayField } from "./m/arrayField";
import { autorun } from "mobx";
import { Address, CustomerAddress, Customer } from "./customerGenerated";
import { ListDetailEditViewLogic } from "./m/viewBaseClasses";

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


class CustomerEditViewLogic extends ListDetailEditViewLogic<CustomerExt, CustomerExt> {
    getModelContext(modelContext: IModelContext) {
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
    }
    runSomeTests() {
        this.model.detail.applyTransportModel(CustomerTransportModel);
        console.log(this.model.detail.item.addresses.items.map(item => Object.keys(item).filter(key => key.startsWith("is")).reduce((p, c) => { p[c] = item[c].getValue(); return p; }, {})));
        autorun(() => console.log(this.model.detail.item.matchcode.state.value));
        this.model.detail.item.matchcode.setValue("123", true);
        this.model.detail.item.addresses.items[1].isDefaultDeliveryAddress.setValue(true, true);
        console.log(this.model.detail.item.addresses.items.map(item => Object.keys(item).filter(key => key.startsWith("is")).reduce((p, c) => { p[c] = item[c].getValue(); return p; }, {})));
    }
}

let cev = new CustomerEditViewLogic(CustomerExt, CustomerExt);
cev.initViewLogic();
cev.runSomeTests();

