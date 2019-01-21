import { IFieldAllMetadata } from "./commonModelTypes";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField, IBaseValueFieldState } from "./baseValueField";

export interface IBooleanField extends IBaseValueField<boolean> {
}
interface IBooleanFieldMetaData extends IBaseValueFieldMetaData {
}
interface IBooleanFieldState extends IBooleanFieldMetaData, IBaseValueFieldState<boolean> {
}
const BooleanFieldMetadataProperties: ReadonlyArray<keyof IBooleanFieldMetaData> = [...BaseValueFieldMetadataProperties,
];
const BooleanFieldStateProperties: ReadonlyArray<keyof IBooleanFieldState> = [...BooleanFieldMetadataProperties, ...BaseValueFieldStateProperties];
export class BooleanField extends BaseValueField<boolean> implements IBooleanField {
    state: IBooleanFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        disabled: false,
        required: false,
        value: null,
        originalValue: null
    };
    applyMetadata(metadata: IFieldAllMetadata) {
        let newState;
        BooleanFieldMetadataProperties.forEach((property) => {
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
        BooleanFieldStateProperties.forEach((property) => {
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
