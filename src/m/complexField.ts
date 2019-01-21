import { IComplexType, createModelInstance } from "./complexType";
import { IBaseFieldMetadata, BaseFieldMetadataProperties, BaseField, IBaseField } from "./baseField";
import { observable } from "mobx";
import { IFieldAllMetadata } from "./commonModelTypes";

export interface IComplexField<TComplexType extends IComplexType> extends IBaseField {
    readonly item: TComplexType;
}
interface IComplexFieldMetaData extends IBaseFieldMetadata {
}
interface IComplexFieldState extends IComplexFieldMetaData {
}
const ComplexFieldMetadataProperties: ReadonlyArray<keyof IComplexFieldMetaData> = [...BaseFieldMetadataProperties];

export class ComplexField<TComplexType extends IComplexType> extends BaseField implements IComplexField<TComplexType> {
    @observable.ref
    state: IComplexFieldState = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false
    };
    readonly item: TComplexType;
    constructor(protected itemCtor: new () => TComplexType) {
        super();
        this.item = createModelInstance(itemCtor);
        (this.item as any).$parent = this;
    }
    applyMetadata(metadata: IFieldAllMetadata) {
        let newState;
        ComplexFieldMetadataProperties.forEach((property) => {
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
        this.item.updateOriginalValue();
    }
    writeSnapshot() {
        let snapshot = {
            ...this.state,
            item: this.item.writeSnapshot()
        }
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        let newState = {
            ...snapshot
        };
        delete newState.item;
        this.item.applySnapshot(snapshot.item);
        this.state = newState;
    }
    writeTransportModel() {
        return this.item.writeTransportModel();
    }
    applyTransportModel(transportModel: any) {
        this.item.applyTransportModel(transportModel);
    }
}