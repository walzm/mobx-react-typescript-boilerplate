var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IdField } from "./idField";
import { GW_METADATA_MODEL_FIELD_METADATA, GW_METADATA_MODEL_FIELDS } from "./commonModelTypes";
import { observable } from "mobx";
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
export class ComplexType {
    constructor() {
        this.id = new IdField();
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
    updateOriginalValue() {
        return this.getFieldNames().some((fieldName => {
            return this[fieldName].updateOriginalValue();
        }));
    }
    writeSnapshot() {
        return this.getFieldNames().reduce((snapshot, fieldName) => {
            let value = this[fieldName].writeSnapshot();
            if (value !== undefined) {
                snapshot[fieldName] = value;
            }
            return snapshot;
        }, {});
    }
    applySnapshot(snapshot) {
        this.getFieldNames().forEach((fieldName) => {
            if (fieldName in snapshot) {
                this[fieldName].applySnapshot(snapshot[fieldName]);
            }
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
export function createModelInstance(complexType) {
    let instance = new complexType();
    let instanceAsAny = instance;
    instanceAsAny.init();
    return instance;
}
