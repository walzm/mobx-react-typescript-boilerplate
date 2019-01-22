var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseValueField } from "./baseValueField";
import { observable } from "mobx";
export class IdField extends BaseValueField {
    constructor() {
        super(...arguments);
        this.state = {
            value: null
        };
    }
    applyMetadata(metadata) {
        this.name = metadata.name;
    }
    applySnapshot(snapshot) {
        if ("value" in snapshot && snapshot.value !== this.state.value) {
            this.state = {
                value: snapshot.value
            };
        }
    }
}
__decorate([
    observable.ref
], IdField.prototype, "state", void 0);
