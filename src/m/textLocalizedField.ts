import { IFieldAllMetadata, FieldSubType } from "./commonModelTypes";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField, IBaseValueFieldState } from "./baseValueField";
import { observable } from "mobx";

type LocalizedTextLocalizedFieldValue = Map<string, string>;
export interface ITextLocalizedField extends IBaseValueField<LocalizedTextLocalizedFieldValue> {
    setMinLength(minLength: number);
    setMaxLength(maxLength: number);
    setSubType(subType: FieldSubType);
}
interface ITextLocalizedFieldMetaData extends IBaseValueFieldMetaData {
    minLength: number;
    maxLength: number;
    subType: FieldSubType;
}
interface ITextLocalizedFieldState extends ITextLocalizedFieldMetaData, IBaseValueFieldState<LocalizedTextLocalizedFieldValue> {
}
const TextLocalizedFieldMetadataProperties: ReadonlyArray<keyof ITextLocalizedFieldMetaData> = [...BaseValueFieldMetadataProperties,
    "minLength",
    "maxLength",
    "subType"
];
const TextLocalizedFieldStateProperties: ReadonlyArray<keyof ITextLocalizedFieldState> = [...TextLocalizedFieldMetadataProperties, ...BaseValueFieldStateProperties].filter((key) => key !== "value" && key != "originalValue");

export class TextLocalizedField extends BaseValueField<LocalizedTextLocalizedFieldValue> implements ITextLocalizedField {
    @observable.ref
    state: ITextLocalizedFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        disabled: false,
        minLength: null,
        maxLength: null,
        subType: null,
        required: false,
        value: new Map(),
        originalValue: new Map()
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
        TextLocalizedFieldMetadataProperties.forEach((property) => {
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
        TextLocalizedFieldStateProperties.forEach((property) => {
            if (property in snapshot && this.state[property] !== snapshot[property]) {
                if (!newState) {
                    newState = {
                        ...this.state
                    }
                }
                newState[property] = snapshot[property];
            }
        })
        newState = newState || { ...this.state };
        newState.value = new Map(snapshot.value);
        newState.originalValue = new Map(snapshot.originalValue);
        if (newState) {
            this.state = newState;
        }
    }
    applyTransportModel(transportModel: any) {
        this.state.value.clear();
        Object.keys(transportModel).forEach(key => { this.state.value.set(key, key[key]) });
        this.state = {
            ...this.state
        }
    }
    writeSnapshot() {
        let snapshot = {
            ...this.state,
            value: [...this.state.value],
            originalValue: [...this.state.originalValue]
        };
        return snapshot;
    }
    writeTransportModel() {
        let transportModel = {} as any;
        for (var [key, value] of this.state.value) {
            transportModel[key] = value;
        }
        return transportModel;
    }
}
