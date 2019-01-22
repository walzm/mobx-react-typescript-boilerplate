import { IFieldAllMetadata } from "./commonModelTypes";
import { observable } from "mobx";
import { BaseFieldMetadataProperties, IBaseFieldMetadata, IBaseField, BaseField } from "./baseField";

export interface IActionField extends IBaseField {
    setDisabled(state: boolean);
    setIcon(icon: string);
    setHideLabel(hideLabel: boolean);
    executeAction();
}

interface IActionFieldMetaData extends IBaseFieldMetadata {
    disabled: boolean;
    icon: string;
    hideLabel: boolean;
}
interface IActionFieldState extends IActionFieldMetaData {
}
const ActionFieldMetadataProperties: ReadonlyArray<keyof IActionFieldMetaData> = [...BaseFieldMetadataProperties,
    "disabled",
    "icon",
    "hideLabel"
];
const ActionFieldStateProperties: ReadonlyArray<keyof IActionFieldMetaData> = [...ActionFieldMetadataProperties];
export class ActionField extends BaseField implements IActionField {
    @observable.ref
    state: IActionFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        disabled: false,
        icon: null,
        hideLabel: false,
    };
    setDisabled(disabled: boolean) {
        if (disabled !== this.state.disabled) {
            this.state = {
                ...this.state,
                disabled
            }
        }
    }
    setIcon(icon: string) {
        if (icon !== this.state.icon) {
            this.state = {
                ...this.state,
                icon
            }
        }
    }
    setHideLabel(hideLabel: boolean) {
        if (hideLabel !== this.state.hideLabel) {
            this.state = {
                ...this.state,
                hideLabel
            }
        }
    }
    applyMetadata(metadata: IFieldAllMetadata) {
        this.name = metadata.name;
        let newState;
        ActionFieldMetadataProperties.forEach((property) => {
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
    updateOriginalValue() {
    }
    writeSnapshot() {
        return this.state;
    }
    applySnapshot(snapshot: any) {
        let newState;
        ActionFieldStateProperties.forEach((property) => {
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
    writeTransportModel() {
        return undefined;
    }
    applyTransportModel() {
    }
    executeAction() {
    }
}
