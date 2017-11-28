import { BoardField, BoardFieldList, FieldResourceList, FieldResource } from '../../../game-mechanics/models/index';
import { toIndexedList } from '../../../shared/utils/utils';

export const formatBoardFields_input = (fields: BoardField[]): BoardFieldList => {
    return fields.reduce((acc: BoardFieldList, elem: BoardField) => {
        const incomeResources = elem.income as any;
        const income: FieldResourceList = toIndexedList(incomeResources, 'resource');
        elem.income = income;
        acc[elem.id] = elem;
        return acc;
    }, {});
};

export const formatBoardField_output = (field: BoardField, edits: BoardField): BoardField => {
    if (field) {
        field = {...field};
        for (const key in field) {
            const value = field[key];
            if (value instanceof Object) {
                const editsValue: BoardField = edits[key];
                const results = [];
                for (const k in editsValue) {
                    const quantity = editsValue[k];
                    if (quantity) {
                        results.push({
                            ...value[k],
                            quantity,
                            resource: k
                        });
                    }
                }
                field[key] = results;
            } else {
                field[key] = edits[key];
            }
        }
    } else {
        field = {};
        for (const key in edits) {
            const value = edits[key];
            if (value instanceof Object && !(value instanceof Blob)) {
                const results = [];
                for (const k in value) {
                    const quantity = value[k];
                    if (quantity) {
                        results.push({
                            ...value[k],
                            quantity,
                            resource: k
                        });
                    }
                }
                field[key] = results;
            } else {
                field[key] = edits[key];
            }
        }
    }
    return field;
};

export const formatBoardField_input = (field): BoardField => {
    const formatted = {...field};
    formatted.income = {};

    field.income.forEach((elem: FieldResource) => {
        formatted.income[elem.resource] = elem;
    });
    return formatted;
};
