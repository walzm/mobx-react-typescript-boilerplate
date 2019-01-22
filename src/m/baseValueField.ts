import { IFieldAllMetadata } from "./commonModelTypes";
import { BaseFieldMetadataProperties, IBaseFieldMetadata, IBaseField, BaseField } from "./baseField";
type OnValueChangedListener = (target: any, value: any, previousValue: any, propertyName: string) => void;

export interface IBaseValueField<TValue> extends IBaseField {
    setDisabled(disabled: boolean);
    setRequired(required: boolean);
    setValue(value: TValue, triggerEvent?: boolean);
    getValue(): TValue;

    attachOnValueChanged(eventListener: OnValueChangedListener);
}

export interface IBaseValueFieldMetaData extends IBaseFieldMetadata {
    disabled: boolean;
    required: boolean;
}
export interface IBaseValueFieldState<TValue> extends IBaseValueFieldMetaData {
    value: TValue;
    originalValue: TValue;
}
export const BaseValueFieldMetadataProperties: ReadonlyArray<keyof IBaseValueFieldMetaData> = [...BaseFieldMetadataProperties,
    "disabled",
    "required"
];
export const BaseValueFieldStateProperties: ReadonlyArray<keyof IBaseValueFieldState<any>> = [...BaseValueFieldMetadataProperties, "value", "originalValue"];
export abstract class BaseValueField<TValue> extends BaseField implements IBaseValueField<TValue> {
    abstract state: IBaseValueFieldState<TValue>;
    private _onValueChangedListeners: OnValueChangedListener[];
    setDisabled(disabled: boolean) {
        if (disabled !== this.state.disabled) {
            this.state = {
                ...this.state,
                disabled
            }
        }
    }
    setRequired(required: boolean) {
        if (required !== this.state.required) {
            this.state = {
                ...this.state,
                required
            }
        }
    }
    setValue(value: TValue, triggerEvent: boolean = false) {
        if (!this.valuesAreEqual(value, this.state.value)) {
            let oldValue = this.state.value;
            this.state = {
                ...this.state,
                value
            }
            triggerEvent && this._onValueChangedListeners && this.invokeOnValueChanged(value, oldValue);
        }
    }
    protected valuesAreEqual(valueA: TValue, valueB: TValue) {
        return valueA === valueB;
    }
    getValue() {
        return this.state.value;
    }
    abstract applyMetadata(metadata: IFieldAllMetadata);
    abstract applySnapshot(snapshot: any);
    applyTransportModel(transportModel: any) {
        if (this.state.value !== transportModel) {
            this.state = {
                ...this.state,
                value: transportModel
            };
        }
    }
    writeSnapshot(): any {
        return this.state;
    }
    writeTransportModel(): any {
        return this.state.value;
    }
    updateOriginalValue() {
    }
    private invokeOnValueChanged(value: TValue, previousValue: TValue) {
        this._onValueChangedListeners.forEach((eventListener) => eventListener(this.parent, value, previousValue, this.name));
    }
    attachOnValueChanged(eventListener: (target: this, value: any, previousValue: any, propertyName: string) => void) {
        this._onValueChangedListeners = this._onValueChangedListeners || [];
        this._onValueChangedListeners.push(eventListener);
    }
}
