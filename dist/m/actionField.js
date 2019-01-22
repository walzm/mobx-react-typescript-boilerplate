var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from "mobx";
import { BaseFieldMetadataProperties, BaseField } from "./baseField";
const ActionFieldMetadataProperties = [...BaseFieldMetadataProperties,
    "disabled",
    "icon",
    "hideLabel"
];
const ActionFieldStateProperties = [...ActionFieldMetadataProperties];
export class ActionField extends BaseField {
    constructor() {
        super(...arguments);
        this.state = {
            label: null,
            shortLabel: null,
            messages: [],
            hidden: false,
            disabled: false,
            icon: null,
            hideLabel: false,
        };
    }
    setDisabled(disabled) {
        if (disabled !== this.state.disabled) {
            this.state = Object.assign({}, this.state, { disabled });
        }
    }
    setIcon(icon) {
        if (icon !== this.state.icon) {
            this.state = Object.assign({}, this.state, { icon });
        }
    }
    setHideLabel(hideLabel) {
        if (hideLabel !== this.state.hideLabel) {
            this.state = Object.assign({}, this.state, { hideLabel });
        }
    }
    applyMetadata(metadata) {
        this.name = metadata.name;
        let newState;
        ActionFieldMetadataProperties.forEach((property) => {
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
    }
    writeSnapshot() {
        return this.state;
    }
    applySnapshot(snapshot) {
        let newState;
        ActionFieldStateProperties.forEach((property) => {
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
    writeTransportModel() {
        return undefined;
    }
    applyTransportModel() {
    }
    executeAction() {
    }
}
__decorate([
    observable.ref
], ActionField.prototype, "state", void 0);
