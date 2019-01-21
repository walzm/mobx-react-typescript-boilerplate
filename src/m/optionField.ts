import { IFieldAllMetadata } from "./modelBase";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueFieldMetadataProperties, BaseValueFieldStateProperties, BaseValueField, IBaseValueFieldState } from "./baseValueField";
export interface IOptionFieldOption {
    id: number;
    label: string;
}
export interface IOptionField extends IBaseValueField<number> {
}
interface IOptionFieldMetaData extends IBaseValueFieldMetaData {
    options: IOptionFieldOption[];
}
interface IOptionFieldState extends IOptionFieldMetaData, IBaseValueFieldState<number> {
}
const OptionFieldMetadataProperties: ReadonlyArray<keyof IOptionFieldMetaData> = [...BaseValueFieldMetadataProperties];
const OptionFieldStateProperties: ReadonlyArray<keyof IOptionFieldState> = [...OptionFieldMetadataProperties, ...BaseValueFieldStateProperties];
export class OptionField extends BaseValueField<number> implements IOptionField {
    state: IOptionFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        disabled: false,
        required: false,
        value: null,
        originalValue: null,
        options: []
    };
    applyMetadata(metadata: IFieldAllMetadata) {
        let newState;
        OptionFieldMetadataProperties.forEach((property) => {
            if (property in metadata && this.state[property] !== metadata[property]) {
                if (!newState) {
                    newState = {
                        ...this.state
                    }
                }
                newState[property] = metadata[property];
            }
        })
        if ("options" in metadata) {
            let options = this.getChangedOptions(metadata.options);
            if (options) {
                newState = newState || { ...this.state };
                newState.options = options;
            }
        }
        if (newState) {
            this.state = newState;
        }
    }
    applySnapshot(snapshot: any) {
        let newState;
        OptionFieldStateProperties.forEach((property) => {
            if (property in snapshot && this.state[property] !== snapshot[property]) {
                if (!newState) {
                    newState = {
                        ...this.state
                    }
                }
                newState[property] = snapshot[property];
            }
        })
        if ("options" in snapshot) {
            let options = this.getChangedOptions(snapshot.options);
            if (options) {
                newState = newState || { ...this.state };
                newState.options = options;
            }
        }
        if (newState) {
            this.state = newState;
        }
    }
    private getChangedOptions(options: IOptionFieldOption[]) {
        if (options.length !== this.state.options.length) {
            return options;
        }
        if (options.some((option, idx) => {
            let currentOption = this.state.options[idx];
            return currentOption.id !== option.id || currentOption.label != option.label;
        })) {
            return options;
        }
        return null;
    }
}