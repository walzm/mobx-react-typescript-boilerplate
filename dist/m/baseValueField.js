import { BaseFieldMetadataProperties, BaseField } from "./baseField";
export const BaseValueFieldMetadataProperties = [...BaseFieldMetadataProperties,
    "disabled",
    "required"
];
export const BaseValueFieldStateProperties = [...BaseValueFieldMetadataProperties, "value", "originalValue"];
export class BaseValueField extends BaseField {
    setDisabled(disabled) {
        if (disabled !== this.state.disabled) {
            this.state = Object.assign({}, this.state, { disabled });
        }
    }
    setRequired(required) {
        if (required !== this.state.required) {
            this.state = Object.assign({}, this.state, { required });
        }
    }
    setValue(value) {
        if (value !== this.state.value) {
            this.state = Object.assign({}, this.state, { value });
        }
    }
    getValue() {
        return this.state.value;
    }
    applyTransportModel(transportModel) {
        if (this.state.value !== transportModel) {
            this.state = Object.assign({}, this.state, { value: transportModel });
        }
    }
    writeSnapshot() {
        return this.state;
    }
    writeTransportModel() {
        return this.state.value;
    }
    updateOriginalValue() {
    }
}
