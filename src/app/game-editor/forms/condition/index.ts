import { Condition, CONDITION_MODES, CLAUSE_TYPE, CLAUSE_RELATIONS } from "@app/game-mechanics";
import { ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { composeFromObject, composeStackOptions, composeConditionOptions, composeActionOptions, composeResourceOptions, composeFieldOptions, composeTokenOptions, composeFactionOptions, composeChoiceOptions, composeRoundOptions } from "../helpers";

export function composeConditionForm(data: Condition, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const clauses = data.clauses || [];
    const award = data.award || [];
    const penalty = data.penalty || [];
    const restricted = data.restricted || [];
    const allowed = data.allowed || [];

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Condition name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <Dropdown name='mode' label='Condition mode' options='{modes}'>{data.mode}</Dropdown>

        <ButtonGroup name='award' label='Award' options='{stacks}' multiple='{true}'>{award}</ButtonGroup>

        <ButtonGroup name='penalty' label='Penalty' options='{stacks}' multiple='{true}'>{penalty}</ButtonGroup>

        <ButtonGroup name='restricted' label='Restrict' options='{stacks}' multiple='{true}'>{restricted}</ButtonGroup>

        <ButtonGroup name='allowed' label='Allow' options='{stacks}' multiple='{true}'>{allowed}</ButtonGroup>

        <Group name='clauses' label='Condition clauses' children='{clauses}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='type' label='Type' options='{types}' required='{true}'>{@item.type}</Dropdown>

                <Dropdown name='condition' label='Condition' options='{conditions}'>{@item.condition}</Dropdown>

                <Dropdown name='action' label='Action' options='{actions}'>{@item.action}</Dropdown>

                <Dropdown name='faction' label='Faction' options='{factions}'>{@item.faction}</Dropdown>

                <Dropdown name='token' label='Token' options='{tokens}'>{@item.token}</Dropdown>

                <Dropdown name='resource' label='Resource' options='{resources}'>{@item.resource}</Dropdown>

                <Dropdown name='field' label='Field' options='{fields}'>{@item.field}</Dropdown>

                <Dropdown name='choice' label='Choice' options='{choices}'>{@item.choice}</Dropdown>

                <Dropdown name='round' label='Round' options='{rounds}'>{@item.round}</Dropdown>

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
            data, clauses, award, penalty, restricted, allowed,
            modes: composeFromObject(CONDITION_MODES),
            relations: composeFromObject(CLAUSE_RELATIONS),
            stacks: composeStackOptions(ent),
            types: composeFromObject(CLAUSE_TYPE),
            conditions: composeConditionOptions(ent),
            actions: composeActionOptions(ent),
            resources: composeResourceOptions(ent),
            fields: composeFieldOptions(ent),
            tokens: composeTokenOptions(ent),
            factions: composeFactionOptions(ent),
            choices: composeChoiceOptions(ent),
            rounds: composeRoundOptions(ent),
        },
    }, true);

    return result as BaseControl[];

}
