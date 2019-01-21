import { IFieldAllMetadata } from "./commonModelTypes";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField, IBaseValueFieldState } from "./baseValueField";

export interface IReferenceField extends IBaseValueField<number> {
    setServiceName(serviceName: string);
    setFilter(filter: string);
    setDisplayLabel(displayLabel: string);
    setDescription(description: string);
}

interface IReferenceFieldMetaData extends IBaseValueFieldMetaData {
    serviceName: string;
    filter: string;
}
interface IReferenceFieldState extends IReferenceFieldMetaData, IBaseValueFieldState<number> {
    displayLabel: string;
    description: string;
}
const ReferenceFieldMetadataProperties: ReadonlyArray<keyof IReferenceFieldMetaData> = [...BaseValueFieldMetadataProperties,
    "serviceName",
    "filter"
];
const ReferenceFieldStateProperties: ReadonlyArray<keyof IReferenceFieldState> = [...ReferenceFieldMetadataProperties, ...BaseValueFieldStateProperties, "displayLabel", "description"];
export class ReferenceField extends BaseValueField<number> implements IReferenceField {
    state: IReferenceFieldState = {
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
    setServiceName(serviceName: string) {
        if (serviceName !== this.state.serviceName) {
            this.state = {
                ...this.state,
                serviceName
            }
        }
    }
    setFilter(filter: string) {
        if (filter !== this.state.filter) {
            this.state = {
                ...this.state,
                filter
            }
        }
    }
    setDisplayLabel(displayLabel: string) {
        if (displayLabel !== this.state.serviceName) {
            this.state = {
                ...this.state,
                displayLabel
            }
        }
    }
    setDescription(description: string) {
        if (description !== this.state.description) {
            this.state = {
                ...this.state,
                description
            }
        }
    }
    applyMetadata(metadata: IFieldAllMetadata) {
        let newState;
        ReferenceFieldMetadataProperties.forEach((property) => {
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
        ReferenceFieldStateProperties.forEach((property) => {
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
