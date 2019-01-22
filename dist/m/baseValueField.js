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
    setValue(value, triggerEvent = false) {
        if (!this.valuesAreEqual(value, this.state.value)) {
            let oldValue = this.state.value;
            this.state = Object.assign({}, this.state, { value });
            triggerEvent && this._onValueChangedListeners && this.invokeOnValueChanged(value, oldValue);
        }
    }
    valuesAreEqual(valueA, valueB) {
        return valueA === valueB;
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
    invokeOnValueChanged(value, previousValue) {
        this._onValueChangedListeners.forEach((eventListener) => eventListener(this.parent, value, previousValue, this.name));
    }
    attachOnValueChanged(eventListener) {
        this._onValueChangedListeners = this._onValueChangedListeners || [];
        this._onValueChangedListeners.push(eventListener);
    }
}
