import { Condition, CONDITION_MODES, CLAUSE, CLAUSE_RELATIONS } from "@app/game-mechanics";
import { ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import {
    composeFromObject, composeEntityOptions, baseTemplate, revealTemplate,
    stakesTemplate, permissionsTemplate, costTemplate, boardTemplate
} from "../helpers";

export function composeConditionForm(data: Condition, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const items = data.clauses || [];
    const done = data.done || [];
    const undone = data.undone || [];
    const disable = data.disable || [];
    const enable = data.enable || [];
    const cost = data.cost || [];
    const reveal_cost = data.reveal_cost || [];

    const template = `
    <Form>
        ${baseTemplate}

        <Dropdown name='mode' label='Condition mode' options='{modes}'>{data.mode}</Dropdown>

        ${revealTemplate}

        ${stakesTemplate}

        ${permissionsTemplate}

        ${boardTemplate}

        ${costTemplate}

        <Group name='clauses' label='Condition clauses' children='{items}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='clause' label='Clause' options='{clauses}' required='{true}'>
                    {@item.clause}
                </Dropdown>

                <Dropdown name='condition' label='Condition' options='{conditions}'>{@item.condition}</Dropdown>

                <Dropdown name='action' label='Action' options='{actions}'>{@item.action}</Dropdown>

                <Dropdown name='faction' label='Faction' options='{factions}'>{@item.faction}</Dropdown>

                <Dropdown name='token' label='Token' options='{tokens}'>{@item.token}</Dropdown>

                <Dropdown name='field' label='Field' options='{fields}'>{@item.field}</Dropdown>

                <Dropdown name='choice' label='Choice' options='{choices}'>{@item.choice}</Dropdown>

                <Dropdown name='round' label='Round' options='{rounds}'>{@item.round}</Dropdown>

                <Dropdown name='team' label='Team' options='{teams}'>{@item.team}</Dropdown>

                <Dropdown name='phase' label='Phase' options='{phases}'>{@item.phase}</Dropdown>

                <Dropdown name='slot' label='Slot' options='{slots}'>{@item.slot}</Dropdown>

                <Dropdown name='path' label='Path' options='{paths}'>{@item.path}</Dropdown>

                <TextInput name='keywords' label='Keyword'>{@item.keywords}</TextInput>

                <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>

                <Dropdown name='relation' label='Relation' options='{relations}'>{@item.relation}</Dropdown> 
            </Form>

        </Group>
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, items, done, undone, disable, enable, reveal_cost, cost,
            modes: composeFromObject(CONDITION_MODES),
            relations: composeFromObject(CLAUSE_RELATIONS),
            clauses: composeFromObject(CLAUSE),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            actions: composeEntityOptions(ent, 'actions'),
            fields: composeEntityOptions(ent, 'fields'),
            tokens: composeEntityOptions(ent, 'tokens'),
            factions: composeEntityOptions(ent, 'factions'),
            choices: composeEntityOptions(ent, 'choices'),
            rounds: composeEntityOptions(ent, 'rounds'),
            stages: composeEntityOptions(ent, 'stages'),
            teams: composeEntityOptions(ent, 'teams'),
            phases: composeEntityOptions(ent, 'phases'),
            slots: composeEntityOptions(ent, 'slots'),
            paths: composeEntityOptions(ent, 'paths'),
        },
    }, true);

    return result as BaseControl[];
}
