import { IFieldAllMetadata } from "./commonModelTypes";
import { BaseFieldMetadataProperties, IBaseFieldMetadata, IBaseField, BaseField } from "./baseField";

export interface IBaseValueField<TValue> extends IBaseField {
    setDisabled(disabled: boolean);
    setRequired(required: boolean);
    setValue(value: TValue);
    getValue(): TValue;
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
    setValue(value: TValue) {
        if (value !== this.state.value) {
            this.state = {
                ...this.state,
                value
            }
        }
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
}
