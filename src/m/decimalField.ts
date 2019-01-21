import { IFieldAllMetadata } from "./modelBase";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField, IBaseValueFieldState } from "./baseValueField";

export interface IDecimalField extends IBaseValueField<number> {
    setMinValue(minValue: number);
    setMaxValue(maxValue: number);
    setMinDecimals(minDecimals: number);
    setMaxDecimals(maxDecimals: number);

}

interface IDecimalFieldMetaData extends IBaseValueFieldMetaData {
    minValue: number;
    maxValue: number;
    minDecimals: number;
    maxDecimals: number;
}
interface IDecimalFieldState extends IDecimalFieldMetaData, IBaseValueFieldState<number> {
}
const DecimalFieldMetadataProperties: ReadonlyArray<keyof IDecimalFieldMetaData> = [...BaseValueFieldMetadataProperties,
    "minValue",
    "maxValue",
    "minDecimals",
    "maxDecimals",
];
const DecimalFieldStateProperties: ReadonlyArray<keyof IDecimalFieldState> = [...DecimalFieldMetadataProperties, ...BaseValueFieldStateProperties];
export class DecimalField extends BaseValueField<number> implements IDecimalField {
    state: IDecimalFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        disabled: false,
        minValue: null,
        maxValue: null,
        minDecimals: 2,
        maxDecimals: 2,
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
    setMinDecimals(minDecimals: number) {
        if (minDecimals !== this.state.minDecimals) {
            this.state = {
                ...this.state,
                minDecimals
            }
        }
    }
    setMaxDecimals(maxDecimals: number) {
        if (maxDecimals !== this.state.maxDecimals) {
            this.state = {
                ...this.state,
                maxDecimals
            }
        }
    }
    applyMetadata(metadata: IFieldAllMetadata) {
        let newState;
        DecimalFieldMetadataProperties.forEach((property) => {
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
        DecimalFieldStateProperties.forEach((property) => {
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
