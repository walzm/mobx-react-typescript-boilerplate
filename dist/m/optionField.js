var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField } from "./baseValueField";
import { observable } from "mobx";
const OptionFieldMetadataProperties = [...BaseValueFieldMetadataProperties];
const OptionFieldStateProperties = [...OptionFieldMetadataProperties, ...BaseValueFieldStateProperties];
export class OptionField extends BaseValueField {
    constructor() {
        super(...arguments);
        this.state = {
            label: null,
            shortLabel: null,
            messages: [],
            hidden: false,
            disabled: false,
            required: false,
            value: null,
            originalValue: null,
            options: []
        };
    }
    applyMetadata(metadata) {
        this.name = metadata.name;
        let newState;
        OptionFieldMetadataProperties.forEach((property) => {
            if (property in metadata && this.state[property] !== metadata[property]) {
                if (!newState) {
                    newState = Object.assign({}, this.state);
                }
                newState[property] = metadata[property];
            }
        });
        if ("options" in metadata) {
            let options = this.getChangedOptions(metadata.options);
            if (options) {
                newState = newState || Object.assign({}, this.state);
                newState.options = options;
            }
        }
        if (newState) {
            this.state = newState;
        }
    }
    applySnapshot(snapshot) {
        let newState;
        OptionFieldStateProperties.forEach((property) => {
            if (property in snapshot && this.state[property] !== snapshot[property]) {
                if (!newState) {
                    newState = Object.assign({}, this.state);
                }
                newState[property] = snapshot[property];
            }
        });
        if ("options" in snapshot) {
            let options = this.getChangedOptions(snapshot.options);
            if (options) {
                newState = newState || Object.assign({}, this.state);
                newState.options = options;
            }
        }
        if (newState) {
            this.state = newState;
        }
    }
    getChangedOptions(options) {
        if (options.length !== this.state.options.length) {
            return options;
        }
        if (options.some((option, idx) => {
            let currentOption = this.state.options[idx];
            return currentOption.id !== option.id || currentOption.label != option.label;
        })) {
            return options;
        }
        return null;
    }
}
__decorate([
    observable.ref
], OptionField.prototype, "state", void 0);
