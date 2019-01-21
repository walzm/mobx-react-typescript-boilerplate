export const GW_METADATA_MODEL_FIELDS = Symbol();
export const GW_METADATA_MODEL_FIELD_METADATA = Symbol();

export enum FieldSubType {
    Text = "text",
    Url = "url",
    Phone = "phone",
    Multiline = "multiline"
}

export interface IFieldAllMetadata {
    name?: string;
    label?: string;
    shortLabel?: string;
    hideLabel?: boolean;
    icon?: string;
    hidden?: boolean;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    minLength?: number;
    maxLength?: number;
    minDecimals?: number;
    maxDecimals?: number;
    minValue?: number;
    maxValue?: number;
    serviceName?: string;
    filter?: string;
    canInsert?: boolean;
    canDelete?: boolean;
    insertDisabled?: boolean;
    deleteDisabled?: boolean;
    serverPaged?: boolean;
    subType?: FieldSubType;
    options: { id: number; label: string }[];
};


export const enum MessageSource {
    Server,
    Client
}
export interface IMessage {
    message: string;
    severity: string;
    source: MessageSource;
}
export class Message implements IMessage {
    message: string;
    severity: string;
    source: MessageSource;
}

export interface IStateModelNode {
    readonly $parent: IStateModelNode;
    writeSnapshot(): any;
    applySnapshot(snapshot: any);
    writeTransportModel(): any;
    applyTransportModel(transportModel: any);
}
