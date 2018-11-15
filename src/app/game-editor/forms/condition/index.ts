import { Condition, CONDITION_MODES, CLAUSE, CLAUSE_RELATIONS, CLAUSE_TYPE } from "@app/game-mechanics";
import { ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { composeFromObject, composeEntityOptions } from "../helpers";

export function composeConditionForm(data: Condition, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const items = data.clauses || [];
    const done = data.done || [];
    const undone = data.undone || [];
    const restricted = data.restricted || [];
    const allowed = data.allowed || [];
    const settings = data.settings || [];

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Condition name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <ButtonGroup name='editions' label='Editions' options='{editions}' multiple='{true}'>{editions}</ButtonGroup>

        <Dropdown name='mode' label='Condition mode' options='{modes}'>{data.mode}</Dropdown>

        <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

        <NumberInput name='reveal_cost' label='Reveal cost'>{data.reveal_cost}</NumberInput>

        <ButtonGroup name='done' label='Award' options='{sources}' multiple='{true}'>{done}</ButtonGroup>

        <ButtonGroup name='undone' label='Penalty' options='{sources}' multiple='{true}'>{undone}</ButtonGroup>

        <ButtonGroup name='restricted' label='Restrict' options='{conditions}' multiple='{true}'>{restricted}</ButtonGroup>

        <ButtonGroup name='allowed' label='Allow' options='{conditions}' multiple='{true}'>{allowed}</ButtonGroup>

        <Dropdown name='board' label='Board' options='{stages}'>{data.board}</Dropdown>

        <Dropdown name='cost' label='Cost' options='{sources}'>{data.cost}</Dropdown>

        <ButtonGroup name='settings' label='Settings' options='{conditions}' multiple='{true}'>{settings}</ButtonGroup>

        <Group name='clauses' label='Condition clauses' children='{items}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='clause' label='Clause' options='{clauses}' required='{true}'>{@item.clause}</Dropdown>

                <Dropdown name='type' label='Type' options='{clause_types}'>{@item.type}</Dropdown>

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
            data, items, done, undone, restricted, allowed, settings,
            modes: composeFromObject(CONDITION_MODES),
            relations: composeFromObject(CLAUSE_RELATIONS),
            clauses: composeFromObject(CLAUSE),
            clause_types: composeFromObject(CLAUSE_TYPE),
            sources: composeEntityOptions(ent, 'sources'),
            editions: composeEntityOptions(ent, 'editions'),
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
