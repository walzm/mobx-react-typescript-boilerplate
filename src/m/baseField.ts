import { IMessage, IStateModelNode, IFieldAllMetadata } from "./commonModelTypes";

export interface IBaseField extends IStateModelNode {
    state: IBaseFieldState;
    setLabel(label: string);
    setShortLabel(shortLabel: string);
    setHidden(hidden: boolean);
    setMessages(messages: IMessage[]);
    updateOriginalValue();
    applyMetadata(metadata: IFieldAllMetadata);
}

export interface IBaseFieldMetadata {
    hidden: boolean;
    label: string;
    shortLabel: string;
    messages: IMessage[];
}

export interface IBaseFieldState extends IBaseFieldMetadata {
}

export const BaseFieldMetadataProperties: ReadonlyArray<keyof IBaseFieldMetadata> = [
    "label",
    "shortLabel",
    "hidden",
    "messages",
];

export abstract class BaseField {
    $parent: IStateModelNode;
    abstract state: IBaseFieldState;
    setLabel(label: string) {
        if (label !== this.state.label) {
            this.state = {
                ...this.state,
                label
            }
        }
    }
    setShortLabel(shortLabel: string) {
        if (shortLabel !== this.state.shortLabel) {
            this.state = {
                ...this.state,
                shortLabel
            }
        }

    }
    setHidden(hidden: boolean) {
        if (hidden !== this.state.hidden) {
            this.state = {
                ...this.state,
                hidden
            }
        }

    }
    setMessages(messages: IMessage[]) {
        if (messages !== this.state.messages) {
            this.state = {
                ...this.state,
                messages
            }
        }
    }
}
