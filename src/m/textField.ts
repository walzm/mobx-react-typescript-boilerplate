import { IFieldAllMetadata, FieldSubType } from "./commonModelTypes";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField, IBaseValueFieldState } from "./baseValueField";
import { observable } from "mobx";

export interface ITextField extends IBaseValueField<string> {
    setMinLength(minLength: number);
    setMaxLength(maxLength: number);
    setSubType(subType: FieldSubType);
}
interface ITextFieldMetaData extends IBaseValueFieldMetaData {
    minLength: number;
    maxLength: number;
    subType: FieldSubType;
}
interface ITextFieldState extends ITextFieldMetaData, IBaseValueFieldState<string> {
}
const TextFieldMetadataProperties: ReadonlyArray<keyof ITextFieldMetaData> = [...BaseValueFieldMetadataProperties,
    "minLength",
    "maxLength",
    "subType"
];
const TextFieldStateProperties: ReadonlyArray<keyof ITextFieldState> = [...TextFieldMetadataProperties, ...BaseValueFieldStateProperties];
export class TextField extends BaseValueField<string> implements ITextField {
    @observable.ref
    state: ITextFieldState = {
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
    setMinLength(minLength: number) {
        if (minLength !== this.state.minLength) {
            this.state = {
                ...this.state,
                minLength
            }
        }
    }
    setMaxLength(maxLength: number) {
        if (maxLength !== this.state.maxLength) {
            this.state = {
                ...this.state,
                maxLength
            }
        }
    }
    setSubType(subType: FieldSubType) {
        if (subType !== this.state.subType) {
            this.state = {
                ...this.state,
                subType
            }
        }
    }
    applyMetadata(metadata: IFieldAllMetadata) {
        let newState;
        TextFieldMetadataProperties.forEach((property) => {
            if (property in metadata && this.state[property] !== metadata[property]) {
                if (!newState) {
                    newState = {
                        ...this.state
                    }
                }
                newState[property] = metadata[property];
            }
        })
        if (newState) {
            this.state = newState;
        }
    }
    applySnapshot(snapshot: any) {
        let newState;
        TextFieldStateProperties.forEach((property) => {
            if (property in snapshot && this.state[property] !== snapshot[property]) {
                if (!newState) {
                    newState = {
                        ...this.state
                    }
                }
                newState[property] = snapshot[property];
            }
        })
        if (newState) {
            this.state = newState;
        }
    }
}
