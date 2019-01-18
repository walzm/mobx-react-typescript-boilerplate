var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed, transaction } from 'mobx';
import "reflect-metadata";
export const GW_METADATA_MODEL_FIELDS = Symbol();
export const GW_METADATA_MODEL_FIELD_METADATA = Symbol();
;
export function createModelInstance(complexType) {
    let instance = new complexType();
    let instanceAsAny = instance;
    instanceAsAny.init();
    return instance;
}
export function observableField(target, key, baseDescriptor) {
}
export function field(fieldMetadata) {
    return function (target, key, baseDescriptor) {
        let fields = Reflect.getOwnMetadata(GW_METADATA_MODEL_FIELDS, target);
        if (fields == null) {
            let baseTypeFields = Reflect.getMetadata(GW_METADATA_MODEL_FIELDS, target);
            if (baseTypeFields) {
                fields = [...baseTypeFields, key];
            }
            else {
                fields = [key];
            }
            Reflect.defineMetadata(GW_METADATA_MODEL_FIELDS, fields, target);
        }
        else if (fields.indexOf(key) < 0) {
            fields.push(key);
        }
        fieldMetadata = fieldMetadata || {};
        fieldMetadata.name = key;
        let baseTypeFieldMetadata = Reflect.getMetadata(GW_METADATA_MODEL_FIELD_METADATA, target, key);
        if (baseTypeFieldMetadata != null) {
            fieldMetadata = Object.assign({}, baseTypeFieldMetadata, fieldMetadata);
        }
        Reflect.defineMetadata(GW_METADATA_MODEL_FIELD_METADATA, fieldMetadata, target, key);
        return observable(target, key, baseDescriptor);
    };
}
export class Message {
}
export class StateModelNode {
}
export class Field extends StateModelNode {
    constructor() {
        super(...arguments);
        this.messages = [];
    }
    applyMetadata(metadata) {
        if (metadata.label) {
            this.label = metadata.label.texts["de-DE"];
        }
        if (metadata.shortLabel) {
            this.shortLabel = metadata.shortLabel.texts["de-DE"];
        }
        if (metadata.hidden != null) {
            this.hidden = metadata.hidden;
        }
    }
    writeSnapshot() {
        return {
            label: this.label,
            hidden: this.hidden,
            messages: this.messages.map((message) => (Object.assign({}, message)))
        };
    }
    applySnapshot(snapshot) {
        this.label = snapshot.label;
        this.hidden = snapshot.hidden;
        if (snapshot.messages) {
            this.messages = [...snapshot.messages];
        }
    }
}
__decorate([
    observableField
], Field.prototype, "hidden", void 0);
__decorate([
    observableField
], Field.prototype, "label", void 0);
__decorate([
    observableField
], Field.prototype, "shortLabel", void 0);
__decorate([
    observableField
], Field.prototype, "messages", void 0);
export class ActionField extends Field {
    constructor() {
        super(...arguments);
        this.modified = false;
    }
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.disabled != null) {
            this.disabled = metadata.disabled;
        }
        if (metadata.icon != null) {
            this.icon = metadata.icon;
        }
        if (metadata.hideLabel != null) {
            this.hideLabel = metadata.hideLabel;
        }
    }
    updateOriginalValue() {
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.icon = this.icon;
        snapshot.hideLabel = this.hideLabel;
        snapshot.disabled = this.disabled;
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.icon = snapshot.icon;
        this.hideLabel = snapshot.hideLabel;
        this.disabled = snapshot.disabled;
    }
    writeTransportModel() {
        return undefined;
    }
    applyTransportModel() {
    }
    executeAction() {
    }
}
__decorate([
    observableField
], ActionField.prototype, "modified", void 0);
__decorate([
    observableField
], ActionField.prototype, "disabled", void 0);
__decorate([
    observableField
], ActionField.prototype, "icon", void 0);
__decorate([
    observableField
], ActionField.prototype, "hideLabel", void 0);
export class ValueField extends Field {
    setValue(value) {
        let oldValue = this.value;
        this.value = value;
        if (value !== oldValue) {
            this.fireOnValueChanged(value, oldValue);
        }
        return oldValue;
    }
    get modified() {
        return this.value !== this.originalValue;
    }
    fireOnValueChanged(value, oldValue) {
    }
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.disabled != null) {
            this.disabled = metadata.disabled;
        }
        if (metadata.required != null) {
            this.required = metadata.required;
        }
        if (metadata.readOnly != null) {
            this.readOnly = metadata.readOnly;
        }
    }
    updateOriginalValue() {
        this.originalValue = this.value;
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.value = this.writeValueForSnapshot(this.value);
        snapshot.originalValue = this.writeValueForSnapshot(this.originalValue);
        snapshot.required = this.required;
        snapshot.readOnly = this.readOnly;
        snapshot.disabled = this.disabled;
        return snapshot;
    }
    writeValueForSnapshot(value) {
        return value;
    }
    readValueFromSnapshot(snapshot) {
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.value = this.readValueFromSnapshot(snapshot.value);
        this.originalValue = this.readValueFromSnapshot(snapshot.originalValue);
        this.required = snapshot.required;
        this.readOnly = snapshot.readOnly;
        this.disabled = snapshot.disabled;
    }
    writeTransportModel() {
        return this.value;
    }
    applyTransportModel(transportModel) {
        this.value = transportModel;
    }
}
__decorate([
    observableField
], ValueField.prototype, "value", void 0);
__decorate([
    observableField
], ValueField.prototype, "originalValue", void 0);
__decorate([
    observableField
], ValueField.prototype, "required", void 0);
__decorate([
    observableField
], ValueField.prototype, "readOnly", void 0);
__decorate([
    observableField
], ValueField.prototype, "disabled", void 0);
__decorate([
    computed
], ValueField.prototype, "modified", null);
export class BooleanField extends ValueField {
}
export var FieldSubType;
(function (FieldSubType) {
    FieldSubType["Text"] = "text";
    FieldSubType["Url"] = "url";
    FieldSubType["Phone"] = "phone";
    FieldSubType["Multiline"] = "multiline";
})(FieldSubType || (FieldSubType = {}));
export class TextField extends ValueField {
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.minLength != null) {
            this.minLength = metadata.minLength;
        }
        if (metadata.maxLength != null) {
            this.maxLength = metadata.maxLength;
        }
        if (metadata.subType != null) {
            this.subType = metadata.subType;
        }
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.minLength = this.maxLength;
        snapshot.maxLength = this.maxLength;
        snapshot.subType = this.subType;
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.minLength = snapshot.minLength;
        this.maxLength = snapshot.maxLength;
        this.subType = snapshot.subType;
    }
}
__decorate([
    observableField
], TextField.prototype, "minLength", void 0);
__decorate([
    observableField
], TextField.prototype, "maxLength", void 0);
__decorate([
    observableField
], TextField.prototype, "subType", void 0);
export class TextLocalizedField extends ValueField {
    get modified() {
        if (this.value.size !== this.originalValue.size) {
            return true;
        }
        for (var [key, value] of this.value) {
            let originalValue = this.originalValue.get(key);
            if (originalValue !== value) {
                return true;
            }
        }
        return false;
    }
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.minLength != null) {
            this.minLength = metadata.minLength;
        }
        if (metadata.maxLength != null) {
            this.maxLength = metadata.maxLength;
        }
        if (metadata.subType != null) {
            this.subType = metadata.subType;
        }
    }
    writeValueForSnapshot(value) {
        return [...value];
    }
    readValueFromSnapshot(snapshot) {
        return new Map(snapshot);
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.minLength = this.maxLength;
        snapshot.maxLength = this.maxLength;
        snapshot.subType = this.subType;
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.minLength = snapshot.minLength;
        this.maxLength = snapshot.maxLength;
        this.subType = snapshot.subType;
    }
    writeTransportModel() {
        let transportModel = {};
        for (var [key, value] of this.value) {
            transportModel[key] = value;
        }
        return this.value;
    }
    applyTransportModel(transportModel) {
        this.value.clear();
        transportModel && Object.keys(transportModel).forEach(key => { this.value.set(key, key[key]); });
    }
}
__decorate([
    observableField
], TextLocalizedField.prototype, "minLength", void 0);
__decorate([
    observableField
], TextLocalizedField.prototype, "maxLength", void 0);
__decorate([
    observableField
], TextLocalizedField.prototype, "subType", void 0);
__decorate([
    computed
], TextLocalizedField.prototype, "modified", null);
export class IntegerField extends ValueField {
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.minValue != null) {
            this.minValue = metadata.minValue;
        }
        if (metadata.maxValue != null) {
            this.maxValue = metadata.maxValue;
        }
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.minValue = this.minValue;
        snapshot.maxValue = this.maxValue;
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.minValue = snapshot.minValue;
        this.maxValue = snapshot.maxValue;
    }
}
__decorate([
    observableField
], IntegerField.prototype, "minValue", void 0);
__decorate([
    observableField
], IntegerField.prototype, "maxValue", void 0);
export class DecimalField extends ValueField {
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.minDecimals != null) {
            this.minDecimals = metadata.minDecimals;
        }
        if (metadata.maxDecimals != null) {
            this.maxDecimals = metadata.maxDecimals;
        }
        if (metadata.minValue != null) {
            this.minValue = metadata.minValue;
        }
        if (metadata.maxValue != null) {
            this.maxValue = metadata.maxValue;
        }
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.minDecimals = this.minDecimals;
        snapshot.maxDecimals = this.maxDecimals;
        snapshot.minValue = this.minValue;
        snapshot.maxValue = this.maxValue;
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.minDecimals = snapshot.minDecimals;
        this.maxDecimals = snapshot.maxDecimals;
        this.minValue = snapshot.minValue;
        this.maxValue = snapshot.maxValue;
    }
}
__decorate([
    observableField
], DecimalField.prototype, "minDecimals", void 0);
__decorate([
    observableField
], DecimalField.prototype, "maxDecimals", void 0);
__decorate([
    observableField
], DecimalField.prototype, "minValue", void 0);
__decorate([
    observableField
], DecimalField.prototype, "maxValue", void 0);
export class OptionFieldOption {
}
export class OptionField extends ValueField {
    constructor() {
        super(...arguments);
        this.options = [];
    }
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.options = [...this.options];
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        if (snapshot.options != null) {
            this.options = [...snapshot.options];
        }
    }
}
__decorate([
    observableField
], OptionField.prototype, "options", void 0);
export class ReferenceField extends ValueField {
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.serviceName != null) {
            this.serviceName = metadata.serviceName;
        }
        if (metadata.filter != null) {
            this.filter = metadata.filter;
        }
        super.applyMetadata(metadata);
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.displayLabel = this.displayLabel;
        snapshot.description = this.description;
        snapshot.serviceName = this.serviceName;
        snapshot.filter = this.filter;
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.displayLabel = snapshot.displayLabel;
        this.description = snapshot.description;
        this.serviceName = snapshot.serviceName;
        this.filter = snapshot.filter;
    }
    writeTransportModel() {
        return {
            id: this.value
        };
    }
    applyTransportModel(transportModel) {
        if (transportModel) {
            this.value = transportModel.id;
        }
        else {
            this.value = null;
            this.displayLabel = null;
            this.description = null;
        }
    }
}
__decorate([
    observableField
], ReferenceField.prototype, "displayLabel", void 0);
__decorate([
    observableField
], ReferenceField.prototype, "description", void 0);
__decorate([
    observableField
], ReferenceField.prototype, "serviceName", void 0);
__decorate([
    observableField
], ReferenceField.prototype, "filter", void 0);
export class ComplexType extends StateModelNode {
    constructor() {
        super();
        this.id = new IntegerField();
    }
    init() {
        this.initFields();
    }
    initFields() {
        let fieldNames = this.getFieldNames();
        fieldNames.forEach((fieldName) => {
            let field = this[fieldName];
            field.$parent = this;
            let fieldMetadata = Reflect.getMetadata(GW_METADATA_MODEL_FIELD_METADATA, this, fieldName);
            fieldMetadata && field.applyMetadata(fieldMetadata);
        });
    }
    getFieldNames() {
        return Reflect.getMetadata(GW_METADATA_MODEL_FIELDS, this);
    }
    get modified() {
        return this.getFieldNames().some((fieldName => {
            let modified = this[fieldName].modified;
            if (modified) {
            }
            return modified;
        }));
    }
    updateOriginalValue() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].updateOriginalValue();
        }));
    }
    writeSnapshot() {
        return this.getFieldNames().reduce((snapshot, fieldName) => {
            snapshot[fieldName] = this[fieldName].writeSnapshot();
            return snapshot;
        }, {});
    }
    applySnapshot(snapshot) {
        transaction(() => {
            this.getFieldNames().forEach((fieldName) => {
                if (fieldName in snapshot) {
                    this[fieldName].applySnapshot(snapshot[fieldName]);
                }
            });
        });
    }
    writeTransportModel() {
        return this.getFieldNames().reduce((transportModel, fieldName) => {
            let value = this[fieldName].writeTransportModel();
            if (value !== undefined) {
                transportModel[fieldName] = value;
            }
            return transportModel;
        }, {});
    }
    applyTransportModel(transportModel) {
        this.getFieldNames().forEach((fieldName) => {
            if (fieldName in transportModel) {
                this[fieldName].applyTransportModel(transportModel[fieldName]);
            }
        });
    }
}
__decorate([
    field()
], ComplexType.prototype, "id", void 0);
__decorate([
    computed
], ComplexType.prototype, "modified", null);
export class ComplexField extends Field {
    constructor(_itemCtor) {
        super();
        this._itemCtor = _itemCtor;
        this.value = createModelInstance(_itemCtor);
        this.value.$parent = this;
    }
    updateOriginalValue() {
        this.value.updateOriginalValue();
    }
    get modified() {
        return this.value.modified;
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.value = this.value.writeSnapshot();
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.value.applySnapshot(snapshot.value);
    }
    writeTransportModel() {
        return this.value.writeTransportModel();
    }
    applyTransportModel(transportModel) {
        this.value.applyTransportModel(transportModel);
    }
}
__decorate([
    computed
], ComplexField.prototype, "modified", null);
__decorate([
    observableField
], ComplexField.prototype, "value", void 0);
export class ArrayField extends Field {
    constructor(_itemCtor) {
        super();
        this._itemCtor = _itemCtor;
        this.originalItemCount = 0;
        this._items = [];
    }
    get items() {
        return this._items;
    }
    append(item) {
        if (item == null) {
            let ctor = this._itemCtor;
            item = createModelInstance(ctor);
            item.$parent = this;
        }
        this._items.push(item);
        return item;
    }
    get modified() {
        if (this.originalItemCount !== this._items.length) {
            return true;
        }
        return this._items.some((item) => item.modified);
    }
    applyMetadata(metadata) {
        super.applyMetadata(metadata);
        if (metadata.disabled != null) {
            this.disabled = metadata.disabled;
        }
        if (metadata.readOnly != null) {
            this.readOnly = metadata.readOnly;
        }
        if (metadata.insertDisabled != null) {
            this.insertDisabled = metadata.insertDisabled;
        }
        if (metadata.deleteDisabled != null) {
            this.deleteDisabled = metadata.deleteDisabled;
        }
        if (metadata.canInsert != null) {
            this.canInsert = metadata.canInsert;
        }
        if (metadata.canDelete != null) {
            this.canDelete = metadata.canDelete;
        }
    }
    updateOriginalValue() {
        this.originalItemCount = this._items.length;
        this._items.forEach((item) => item.updateOriginalValue());
    }
    writeSnapshot() {
        let snapshot = super.writeSnapshot();
        snapshot.items = this._items.map((item) => item.writeSnapshot());
        snapshot.originalItemCount = this.originalItemCount;
        snapshot.disabled = this.disabled;
        snapshot.readOnly = this.readOnly;
        snapshot.insertDisabled = this.insertDisabled;
        snapshot.deleteDisabled = this.deleteDisabled;
        snapshot.canInsert = this.canInsert;
        snapshot.canDelete = this.canDelete;
        snapshot.skip = this.skip;
        snapshot.take = this.take;
        snapshot.totalCount = this.totalCount;
        snapshot.loading = this.loading;
        snapshot.serverPaged = this.serverPaged;
        return snapshot;
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        let newItems = snapshot.items && snapshot.items && snapshot.items.map && snapshot.items.map((snapshotItem) => {
            let item = createModelInstance(this._itemCtor);
            item.applySnapshot(snapshotItem);
            item.$parent = this;
            return item;
        });
        if (newItems != null) {
            this._items = newItems;
        }
        this.originalItemCount = snapshot.originalItemCount;
        this.disabled = snapshot.disabled;
        this.readOnly = snapshot.readOnly;
        this.insertDisabled = snapshot.insertDisabled;
        this.deleteDisabled = snapshot.deleteDisabled;
        this.canInsert = snapshot.canInsert;
        this.canDelete = snapshot.canDelete;
        this.skip = snapshot.skip;
        this.take = snapshot.take;
        this.totalCount = snapshot.totalCount;
        this.loading = snapshot.loading;
        this.serverPaged = snapshot.serverPaged;
    }
    writeTransportModel() {
        return this._items.map((item) => {
            return item.writeTransportModel();
        });
    }
    applyTransportModel(transportModel) {
        let newItems = transportModel && transportModel.map && transportModel.map((transportModelItem) => {
            let item = createModelInstance(this._itemCtor);
            item.applyTransportModel(transportModelItem);
            item.$parent = this;
            return item;
        });
        if (newItems != null) {
            this._items = newItems;
        }
    }
}
__decorate([
    observableField
], ArrayField.prototype, "originalItemCount", void 0);
__decorate([
    observableField
], ArrayField.prototype, "disabled", void 0);
__decorate([
    observableField
], ArrayField.prototype, "readOnly", void 0);
__decorate([
    observableField
], ArrayField.prototype, "insertDisabled", void 0);
__decorate([
    observableField
], ArrayField.prototype, "deleteDisabled", void 0);
__decorate([
    observableField
], ArrayField.prototype, "canInsert", void 0);
__decorate([
    observableField
], ArrayField.prototype, "canDelete", void 0);
__decorate([
    observableField
], ArrayField.prototype, "skip", void 0);
__decorate([
    observableField
], ArrayField.prototype, "take", void 0);
__decorate([
    observableField
], ArrayField.prototype, "totalCount", void 0);
__decorate([
    observableField
], ArrayField.prototype, "loading", void 0);
__decorate([
    observableField
], ArrayField.prototype, "serverPaged", void 0);
__decorate([
    observableField
], ArrayField.prototype, "_items", void 0);
__decorate([
    computed
], ArrayField.prototype, "items", null);
__decorate([
    computed
], ArrayField.prototype, "modified", null);
