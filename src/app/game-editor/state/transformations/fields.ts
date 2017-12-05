import { BoardField, FieldResource } from '../../../game-mechanics/models/index';

export const formatBoardField_output = (field: BoardField, edits: BoardField): BoardField => {
    edits = {...edits};
    if (field) {
        edits.income = edits.income.map((elem: FieldResource, index: number) => {
            const resourceIncome = {...elem, field: field.id};
            const id = field.income[index] ? field.income[index].id : null;
            if (id) {
                resourceIncome.id = id;
            }
            return resourceIncome;
        });
        edits.cost = edits.cost.map((elem: FieldResource, index: number) => {
            const resourceCost = {...elem, field: field.id};
            const id = field.cost[index] ? field.cost[index].id : null;
            if (id) {
                resourceCost.id = id;
            }
            return resourceCost;
        });
    }
    return edits;
};
