import { IFieldAllMetadata } from "./commonModelTypes";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField, IBaseValueFieldState } from "./baseValueField";
import { observable } from "mobx";

export interface IIntegerField extends IBaseValueField<number> {
    setMinValue(minValue: number);
    setMaxValue(maxValue: number);
}

interface IIntegerFieldMetaData extends IBaseValueFieldMetaData {
    minValue: number;
    maxValue: number;
}
interface IIntegerFieldState extends IIntegerFieldMetaData, IBaseValueFieldState<number> {
}
const IntegerFieldMetadataProperties: ReadonlyArray<keyof IIntegerFieldMetaData> = [...BaseValueFieldMetadataProperties,
    "minValue",
    "maxValue"
];
const IntegerFieldStateProperties: ReadonlyArray<keyof IIntegerFieldState> = [...IntegerFieldMetadataProperties, ...BaseValueFieldStateProperties];
export class IntegerField extends BaseValueField<number> implements IIntegerField {
    @observable.ref
    state: IIntegerFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        disabled: false,
        minValue: null,
        maxValue: null,
        required: false,
        value: null,
        originalValue: null
    };
    setMinValue(minValue: number) {
        if (minValue !== this.state.minValue) {
            this.state = {
                ...this.state,
                minValue
            }
        }
    }
    setMaxValue(maxValue: number) {
        if (maxValue !== this.state.maxValue) {
            this.state = {
                ...this.state,
                maxValue
            }
        }
    }
    applyMetadata(metadata: IFieldAllMetadata) {
        this.name = metadata.name;
        let newState;
        IntegerFieldMetadataProperties.forEach((property) => {
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
        IntegerFieldStateProperties.forEach((property) => {
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
