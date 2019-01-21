import { IFieldAllMetadata } from "./modelBase";
import { observable } from "mobx";
import { FieldMetadataProperties, IFieldMetadata, IField, Field } from "./baseField";
import { IComplexType, createModelInstance } from "./complexType";

export type ReadonlyArrayInnerType<T> = T extends ReadonlyArray<infer U> ? U : never;
export type ArrayFieldInnerType<T> = T extends IArrayField<infer U> ? U : never;


export interface IArrayField<TComplexType extends IComplexType> extends IField {
    setDisabled(disabled: boolean);
    setReadonly(readonly: boolean);
    setInsertDisabled(insertDisabled: boolean);
    setDeleteDisabled(deleteDisabled: boolean);
    setCanInsert(canInsert: boolean);
    setCanDelete(canDelete: boolean);
    setSkip(skip: number);
    setTake(take: number);
    setTotalCount(totalCount: number);
    setLoading(loading: boolean);
    setServerPaged(serverPaged: boolean);

    append(item?: TComplexType): TComplexType;
    readonly items: ReadonlyArray<TComplexType>;
}

interface IArrayFieldMetaData extends IFieldMetadata {
    disabled: boolean;
    readonly: boolean;
    insertDisabled: boolean;
    deleteDisabled: boolean;
    canInsert: boolean;
    canDelete: boolean;

    skip: number;
    take: number;
    totalCount: number;
    loading: boolean;
    serverPaged: boolean
}
interface IArrayFieldState extends IArrayFieldMetaData {
}
const ArrayFieldMetadataProperties: ReadonlyArray<keyof IArrayFieldMetaData> = [...FieldMetadataProperties,
    "disabled",
    "readonly",
    "insertDisabled",
    "deleteDisabled",
    "canInsert",
    "canDelete",

    "skip",
    "take",
    "totalCount",
    "loading",
    "serverPaged"
];

const ArrayFieldStateProperties: ReadonlyArray<keyof IArrayFieldMetaData> = [...ArrayFieldMetadataProperties];
export class ArrayField<TComplexType extends IComplexType> extends Field implements IArrayField<TComplexType> {
    @observable.ref
    state: IArrayFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        disabled: false,
        readonly: false,
        insertDisabled: true,
        deleteDisabled: true,
        canInsert: true,
        canDelete: true,
        skip: null,
        take: null,
        totalCount: null,
        loading: false,
        serverPaged: false
    };
    @observable _items: TComplexType[] = [];
    get items() {
        return this._items;
    }
    constructor(protected itemCtor: new () => TComplexType) {
        super();
    }
    setDisabled(disabled: boolean) {
        if (disabled !== this.state.disabled) {
            this.state = {
                ...this.state,
                disabled
            }
        }
    }
    setReadonly(readonly: boolean) {
        if (readonly !== this.state.readonly) {
            this.state = {
                ...this.state,
                readonly
            }
        }
    }
    setInsertDisabled(insertDisabled: boolean) {
        if (insertDisabled !== this.state.insertDisabled) {
            this.state = {
                ...this.state,
                insertDisabled
            }
        }
    }
    setDeleteDisabled(deleteDisabled: boolean) {
        if (deleteDisabled !== this.state.deleteDisabled) {
            this.state = {
                ...this.state,
                deleteDisabled
            }
        }
    }
    setCanInsert(canInsert: boolean) {
        if (canInsert !== this.state.canInsert) {
            this.state = {
                ...this.state,
                canInsert
            }
        }
    }
    setCanDelete(canDelete: boolean) {
        if (canDelete !== this.state.canDelete) {
            this.state = {
                ...this.state,
                canDelete
            }
        }
    }
    setSkip(skip: number) {
        if (skip !== this.state.skip) {
            this.state = {
                ...this.state,
                skip
            }
        }
    }
    setTake(take: number) {
        if (take !== this.state.take) {
            this.state = {
                ...this.state,
                take
            }
        }
    }
    setTotalCount(totalCount: number) {
        if (totalCount !== this.state.totalCount) {
            this.state = {
                ...this.state,
                totalCount
            }
        }
    }
    setLoading(loading: boolean) {
        if (loading !== this.state.loading) {
            this.state = {
                ...this.state,
                loading
            }
        }
    }
    setServerPaged(serverPaged: boolean) {
        if (serverPaged !== this.state.serverPaged) {
            this.state = {
                ...this.state,
                serverPaged
            }
        }
    }

    applyMetadata(metadata: IFieldAllMetadata) {
        let newState;
        ArrayFieldMetadataProperties.forEach((property) => {
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
        let snapshot = {
            ...this.state,
            items: this.items.map((item) => item.writeSnapshot())
        };
        return snapshot;

    }
    applySnapshot(snapshot: any) {
        let newState;
        ArrayFieldStateProperties.forEach((property) => {
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
        if (snapshot && snapshot.items) {
            let newItems = snapshot.items.map((snapshotItem) => {
                let item = createModelInstance(this.itemCtor);
                item.applyTransportModel(snapshotItem);
                (item as any).$parent = this;
                return item;
            });
            if (newItems != null) {
                this._items = newItems;
            }
        }
    }
    writeTransportModel() {
        return this._items.map((item) => {
            return item.writeTransportModel();
        });
    }
    applyTransportModel(transportModel: any) {
        let newItems = transportModel && transportModel.map && transportModel.map((transportModelItem) => {
            let item = createModelInstance(this.itemCtor);
            item.applyTransportModel(transportModelItem);
            (item as any).$parent = this;
            return item;
        });
        if (newItems != null) {
            this._items = newItems;
        }
    }
    public append(item?: TComplexType): TComplexType {
        if (item == null) {
            let ctor = this.itemCtor;
            item = createModelInstance(ctor);
            (item as any).$parent = this;
        }
        this._items.push(item);
        return item;
    }
}
