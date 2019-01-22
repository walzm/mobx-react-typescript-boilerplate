var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField } from "./baseValueField";
import { observable } from "mobx";
const ReferenceFieldMetadataProperties = [...BaseValueFieldMetadataProperties,
    "serviceName",
    "filter"
];
const ReferenceFieldStateProperties = [...ReferenceFieldMetadataProperties, ...BaseValueFieldStateProperties, "displayLabel", "description"];
export class ReferenceField extends BaseValueField {
    constructor() {
        super(...arguments);
        this.state = {
            label: null,
            shortLabel: null,
            messages: [],
            hidden: false,
            disabled: false,
            required: false,
            serviceName: null,
            filter: null,
            value: null,
            originalValue: null,
            displayLabel: null,
            description: null
        };
    }
    setServiceName(serviceName) {
        if (serviceName !== this.state.serviceName) {
            this.state = Object.assign({}, this.state, { serviceName });
        }
    }
    setFilter(filter) {
        if (filter !== this.state.filter) {
            this.state = Object.assign({}, this.state, { filter });
        }
    }
    setDisplayLabel(displayLabel) {
        if (displayLabel !== this.state.serviceName) {
            this.state = Object.assign({}, this.state, { displayLabel });
        }
    }
    setDescription(description) {
        if (description !== this.state.description) {
            this.state = Object.assign({}, this.state, { description });
        }
    }
    applyMetadata(metadata) {
        this.name = metadata.name;
        let newState;
        ReferenceFieldMetadataProperties.forEach((property) => {
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
        ReferenceFieldStateProperties.forEach((property) => {
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
], ReferenceField.prototype, "state", void 0);
