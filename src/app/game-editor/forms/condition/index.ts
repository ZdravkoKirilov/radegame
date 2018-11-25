import { Condition, CONDITION_MODES, PRIMARY_CLAUSE, CLAUSE_RELATIONS, SECONDARY_CLAUSE } from "@app/game-mechanics";
import { ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { composeFromObject, composeEntityOptions } from "../helpers";

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
        <TextInput name='name' required='{true}' label='Condition name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <Dropdown name='mode' label='Condition mode' options='{modes}'>{data.mode}</Dropdown>

        <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

        <ButtonGroup name='reveal_cost' label='Reveal cost' options='{sources}' multiple='true'>
            {reveal_cost}
        </ButtonGroup>

        <ButtonGroup name='done' label='Award' options='{sources}' multiple='{true}'>{done}</ButtonGroup>

        <ButtonGroup name='undone' label='Penalty' options='{sources}' multiple='{true}'>{undone}</ButtonGroup>

        <ButtonGroup name='disable' label='Restrict' options='{conditions}' multiple='{true}'>{disable}</ButtonGroup>

        <ButtonGroup name='enable' label='Allow' options='{conditions}' multiple='{true}'>{enable}</ButtonGroup>

        <Dropdown name='board' label='Board' options='{stages}'>{data.board}</Dropdown>

        <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>

        <Group name='clauses' label='Condition clauses' children='{items}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='primary_clause' label='Clause' options='{primary_clauses}' required='{true}'>
                    {@item.primary_clause}
                </Dropdown>

                <Dropdown name='secondary_clause' label='Type' options='{secondary_clauses}'>
                    {@item.secondary_clause}
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
            primary_clauses: composeFromObject(PRIMARY_CLAUSE),
            secondary_clauses: composeFromObject(SECONDARY_CLAUSE),
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
