import { IFieldAllMetadata } from "./modelBase";
import { IBaseValueField, IBaseValueFieldMetaData, BaseValueField, IBaseValueFieldState } from "./baseValueField";

export interface IIdField extends IBaseValueField<number> {
}
interface IIdFieldMetaData extends IBaseValueFieldMetaData {
}
interface IIdFieldState extends IIdFieldMetaData, IBaseValueFieldState<number> {
}
export class IdField extends BaseValueField<number> implements IIdField {
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
