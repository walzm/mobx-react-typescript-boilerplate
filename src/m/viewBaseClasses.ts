import { ComplexType, createModelContext, createModelInstance, IModelContext, IComplexType, field } from "./complexType";
import { ArrayField } from "./arrayField";
import { ComplexField } from "./complexField";

class ModelBasedViewLogic<TModel extends ComplexType> extends ComplexType {
    constructor(protected modelCtor: new () => TModel) {
        super();
    }
    initViewLogic() {
        this.initModel();
    }
    initModel() {
        let modelContext = createModelContext();
        this.initModelContext(modelContext);
        this.model = createModelInstance(this.modelCtor, null, modelContext);
    }
    initModelContext(modelContext: IModelContext) {
    }
    model: TModel;
}

class ListDetailEditModel<TListType extends IComplexType, TDetailType extends IComplexType> extends ComplexType {
    constructor(protected listItemCtor: new () => TListType, protected detailItemCtor: new () => TDetailType) {
        super();
    }
    @field()
    readonly list = new ArrayField(this.listItemCtor);
    @field()
    readonly detail = new ComplexField(this.detailItemCtor);
}

export class ListDetailEditViewLogic<TListType extends IComplexType, TDetailType extends IComplexType> extends ModelBasedViewLogic<ListDetailEditModel<TListType, TDetailType>> {
    constructor(protected listItemCtor: new () => TListType, protected detailItemCtor: new () => TDetailType) {
        super(ListDetailEditModel.bind(ListDetailEditModel, listItemCtor, detailItemCtor));
    }
}
