import { IComplexType, createModelInstance, IModelContext } from "./complexType";
import { IBaseFieldMetadata, BaseFieldMetadataProperties, BaseField, IBaseField } from "./baseField";
import { observable } from "mobx";
import { IFieldAllMetadata } from "./commonModelTypes";

export interface IComplexField<TComplexType extends IComplexType> extends IBaseField {
    readonly item: TComplexType
}
interface IComplexFieldMetaData extends IBaseFieldMetadata {
}
interface IComplexFieldState<TComplexType extends IComplexType> extends IComplexFieldMetaData {
    item: TComplexType
}
const ComplexFieldMetadataProperties: ReadonlyArray<keyof IComplexFieldMetaData> = [...BaseFieldMetadataProperties];

export class ComplexField<TComplexType extends IComplexType> extends BaseField implements IComplexField<TComplexType> {
    @observable.ref
    state: IComplexFieldState<TComplexType> = {
        label: null,
        shortLabel: null,
        messages: [],
        hidden: false,
        item: null
    };
    constructor(protected itemCtor: new () => TComplexType) {
        super();
    }
    get item() {
        return this.state.item;
    }
    applyMetadata(metadata: IFieldAllMetadata) {
        this.name = metadata.name;
        this.state.item = createModelInstance(this.itemCtor, this, (this.parent as any).modelContext);
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
        this.state.item.updateOriginalValue();
    }
    writeSnapshot() {
        let snapshot = {
            ...this.state,
            item: this.state.item.writeSnapshot()
        }
        return snapshot;
    }
    applySnapshot(snapshot: any) {
        let newState = {
            ...snapshot,
            item: this.state.item
        };
        newState.item.applySnapshot(snapshot.item);
        this.state = newState;
    }
    writeTransportModel() {
        return this.state.item.writeTransportModel();
    }
    applyTransportModel(transportModel: any) {
        this.state.item.applyTransportModel(transportModel);
    }
}