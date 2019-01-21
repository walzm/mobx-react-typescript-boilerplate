import { IFieldAllMetadata } from "./commonModelTypes";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueField, IBaseValueFieldState } from "./baseValueField";
import { observable } from "mobx";

export interface IIdField extends IBaseValueField<number> {
}
interface IIdFieldMetaData extends IBaseValueFieldMetaData {
}
interface IIdFieldState extends IIdFieldMetaData, IBaseValueFieldState<number> {
}
export class IdField extends BaseValueField<number> implements IIdField {
    @observable.ref
    state: IIdFieldState = {
        value: null
    } as IIdFieldState;
    applyMetadata(_metadata: IFieldAllMetadata) {
    }
    applySnapshot(snapshot: any) {
        if ("value" in snapshot && snapshot.value !== this.state.value) {
            this.state = {
                value: snapshot.value
            } as IIdFieldState;
        }
    }
}
