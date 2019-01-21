var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { createModelInstance } from "./complexType";
import { BaseFieldMetadataProperties, BaseField } from "./baseField";
import { observable } from "mobx";
const ComplexFieldMetadataProperties = [...BaseFieldMetadataProperties];
export class ComplexField extends BaseField {
    constructor(itemCtor) {
        super();
        this.itemCtor = itemCtor;
        this.state = {
            label: null,
            shortLabel: null,
            messages: [],
            hidden: false,
            item: null
        };
        this.state.item = createModelInstance(itemCtor);
        this.state.item.$parent = this;
    }
    get item() {
        return this.state.item;
    }
    applyMetadata(metadata) {
        let newState;
        ComplexFieldMetadataProperties.forEach((property) => {
            if (property in metadata && this.state[property] !== metadata[property]) {
                if (!newState) {
                    newState = Object.assign({}, this.state);
                }
                newState[property] = metadata[property];
            }
        });
        if (newState) {
            this.state = newState;
        }
    }
    updateOriginalValue() {
        this.state.item.updateOriginalValue();
    }
    writeSnapshot() {
        let snapshot = Object.assign({}, this.state, { item: this.state.item.writeSnapshot() });
        return snapshot;
    }
    applySnapshot(snapshot) {
        let newState = Object.assign({}, snapshot, { item: this.state.item });
        newState.item.applySnapshot(snapshot.item);
        this.state = newState;
    }
    writeTransportModel() {
        return this.state.item.writeTransportModel();
    }
    applyTransportModel(transportModel) {
        this.state.item.applyTransportModel(transportModel);
    }
}
__decorate([
    observable.ref
], ComplexField.prototype, "state", void 0);
