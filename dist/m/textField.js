var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField } from "./baseValueField";
import { observable } from "mobx";
const TextFieldMetadataProperties = [...BaseValueFieldMetadataProperties,
    "minLength",
    "maxLength",
    "subType"
];
const TextFieldStateProperties = [...TextFieldMetadataProperties, ...BaseValueFieldStateProperties];
export class TextField extends BaseValueField {
    constructor() {
        super(...arguments);
        this.state = {
            label: null,
            shortLabel: null,
            messages: [],
            hidden: false,
            disabled: false,
            minLength: null,
            maxLength: null,
            subType: null,
            required: false,
            value: null,
            originalValue: null
        };
    }
    setMinLength(minLength) {
        if (minLength !== this.state.minLength) {
            this.state = Object.assign({}, this.state, { minLength });
        }
    }
    setMaxLength(maxLength) {
        if (maxLength !== this.state.maxLength) {
            this.state = Object.assign({}, this.state, { maxLength });
        }
    }
    setSubType(subType) {
        if (subType !== this.state.subType) {
            this.state = Object.assign({}, this.state, { subType });
        }
    }
    applyMetadata(metadata) {
        this.name = metadata.name;
        let newState;
        TextFieldMetadataProperties.forEach((property) => {
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
    applySnapshot(snapshot) {
        let newState;
        TextFieldStateProperties.forEach((property) => {
            if (property in snapshot && this.state[property] !== snapshot[property]) {
                if (!newState) {
                    newState = Object.assign({}, this.state);
                }
                newState[property] = snapshot[property];
            }
        });
        if (newState) {
            this.state = newState;
        }
    }
}
__decorate([
    observable.ref
], TextField.prototype, "state", void 0);
