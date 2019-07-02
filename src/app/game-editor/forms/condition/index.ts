import { Condition, CONDITION_MODES, CLAUSE_RELATIONS, GameEntity } from "@app/game-mechanics";
import { ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import {
    composeFromObject, baseTemplate,
    stakesTemplate, composeCommonFormContext
} from "../helpers";

export function composeConditionForm(data: Condition, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const items = data.clauses || [];
    const done = data.done || [];
    const undone = data.undone || [];

    const template = `
    <Form>
        ${baseTemplate}

        <Dropdown name='mode' label='Condition mode' options='{modes}'>{data.mode}</Dropdown>

        ${stakesTemplate}

        <Group name='clauses' label='Condition clauses' children='{items}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='clause' label='Clause' options='{expression_options}' required='{true}'>
                    {@item.clause}
                </Dropdown>

                <NumberInput name='value' label='Value'>{@item.value}</NumberInput>

                <Dropdown name='relation' label='Relation' options='{relations}'>{@item.relation}</Dropdown> 
            </Form>

        </Group>
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data, items, done, undone,
            modes: composeFromObject(CONDITION_MODES),
            relations: composeFromObject(CLAUSE_RELATIONS),
        },
    }, true);

    return result as BaseControl[];
}
