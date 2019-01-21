var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from "mobx";
import { BaseFieldMetadataProperties, BaseField } from "./baseField";
import { createModelInstance } from "./complexType";
const ArrayFieldMetadataProperties = [...BaseFieldMetadataProperties,
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
const ArrayFieldStateProperties = [...ArrayFieldMetadataProperties];
export class ArrayField extends BaseField {
    constructor(itemCtor) {
        super();
        this.itemCtor = itemCtor;
        this.state = {
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
            serverPaged: false,
            items: observable([])
        };
    }
    get items() {
        return this.state.items;
    }
    setDisabled(disabled) {
        if (disabled !== this.state.disabled) {
            this.state = Object.assign({}, this.state, { disabled });
        }
    }
    setReadonly(readonly) {
        if (readonly !== this.state.readonly) {
            this.state = Object.assign({}, this.state, { readonly });
        }
    }
    setInsertDisabled(insertDisabled) {
        if (insertDisabled !== this.state.insertDisabled) {
            this.state = Object.assign({}, this.state, { insertDisabled });
        }
    }
    setDeleteDisabled(deleteDisabled) {
        if (deleteDisabled !== this.state.deleteDisabled) {
            this.state = Object.assign({}, this.state, { deleteDisabled });
        }
    }
    setCanInsert(canInsert) {
        if (canInsert !== this.state.canInsert) {
            this.state = Object.assign({}, this.state, { canInsert });
        }
    }
    setCanDelete(canDelete) {
        if (canDelete !== this.state.canDelete) {
            this.state = Object.assign({}, this.state, { canDelete });
        }
    }
    setSkip(skip) {
        if (skip !== this.state.skip) {
            this.state = Object.assign({}, this.state, { skip });
        }
    }
    setTake(take) {
        if (take !== this.state.take) {
            this.state = Object.assign({}, this.state, { take });
        }
    }
    setTotalCount(totalCount) {
        if (totalCount !== this.state.totalCount) {
            this.state = Object.assign({}, this.state, { totalCount });
        }
    }
    setLoading(loading) {
        if (loading !== this.state.loading) {
            this.state = Object.assign({}, this.state, { loading });
        }
    }
    setServerPaged(serverPaged) {
        if (serverPaged !== this.state.serverPaged) {
            this.state = Object.assign({}, this.state, { serverPaged });
        }
    }
    applyMetadata(metadata) {
        let newState;
        ArrayFieldMetadataProperties.forEach((property) => {
            if (property in metadata && this.state[property] !== metadata[property]) {
                if (!newState) {
                    newState = Object.assign({}, this.state);
                }
                newState[property] = metadata[property];
            }
        });
        if (newState) {
            this.state = newState;
        }
    }
    updateOriginalValue() {
    }
    writeSnapshot() {
        let snapshot = Object.assign({}, this.state, { items: this.items.map((item) => item.writeSnapshot()) });
        return snapshot;
    }
    applySnapshot(snapshot) {
        let newState;
        ArrayFieldStateProperties.forEach((property) => {
            if (property in snapshot && this.state[property] !== snapshot[property]) {
                if (!newState) {
                    newState = Object.assign({}, this.state);
                }
                newState[property] = snapshot[property];
            }
        });
        let newItems = (snapshot.items || []).map((snapshotItem) => {
            let item = createModelInstance(this.itemCtor);
            item.applySnapshot(snapshotItem);
            item.$parent = this;
            return item;
        });
        if (this.state.items.length !== newItems.length) {
            if (!newState) {
                newState = Object.assign({}, this.state);
            }
            newState.items = observable(newItems);
        }
        if (newState) {
            this.state = newState;
        }
    }
    writeTransportModel() {
        return this.state.items.map((item) => {
            return item.writeTransportModel();
        });
    }
    applyTransportModel(transportModel) {
        let newItems = transportModel && transportModel.map && transportModel.map((transportModelItem) => {
            let item = createModelInstance(this.itemCtor);
            item.applyTransportModel(transportModelItem);
            item.$parent = this;
            return item;
        });
        if (newItems != null) {
            this.state.items = newItems;
        }
    }
    append(item) {
        if (item == null) {
            let ctor = this.itemCtor;
            item = createModelInstance(ctor);
            item.$parent = this;
        }
        this.state.items.push(item);
        return item;
    }
}
__decorate([
    observable.ref
], ArrayField.prototype, "state", void 0);
