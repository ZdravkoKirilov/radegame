import keys from 'lodash/keys';

import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types,
    ACTION_TARGET, ACTION_MODE
} from '@app/game-mechanics';
import {
composeFromObject, composeBooleanOptions,
} from '../helpers';

export const composeActivityForm: FormDefinition = (data: GameAction, ent: ConnectedEntities) => {
    data = data || {};
    const configs = data.configs || [];
    const cost = data.cost || [];
    const restricted = data.restricted || [];
    const allowed = data.allowed || [];
    const condition = data.condition || [];

    const template = `
        <Form>
            <TextInput name='name' required='{true}' label='Action name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <Dropdown name='mode' label='Action mode' options='{modes}'>{data.mode}</Dropdown>

            <ButtonGroup name='cost' label='Cost' options='{stacks}' multiple='{true}'>{cost}</ButtonGroup>

            <ButtonGroup name='restricted' label='Restrict' options='{stacks}' multiple='{true}'>{restricted}</ButtonGroup>

            <ButtonGroup name='allowed' label='Allow' options='{stacks}' multiple='{true}'>{allowed}</ButtonGroup>

            <ButtonGroup name='condition' label='Condition' options='{stacks}' multiple='{true}'>{condition}</ButtonGroup>

            <Group name='configs' label='Action configs' children='{configs}' item='@item' addButtonText='Add'>

                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}' required='{true}'>{@item.type}</Dropdown>

                    <Dropdown name='target' label='Target' options='{targets}' required='{true}'>{@item.target}</Dropdown>

                    <Dropdown name='action' label='Action' options='{actions}' showImage='{true}'>{@item.action}</Dropdown>

                    <Dropdown name='condition' label='Condition' options='{conditions}' showImage='{true}'>{@item.condition}</Dropdown>

                    <Dropdown name='resource' label='Resource' options='{resources}' showImage='{true}'>{@item.resource}</Dropdown>

                    <Dropdown name='faction' label='Faction' options='{factions}' showImage='{true}'>{@item.faction}</Dropdown>

                    <Dropdown name='token' label='Token' options='{tokens}' showImage='{true}'>{@item.token}</Dropdown>

                    <Dropdown name='choice' label='Choice' options='{choices}' showImage='{true}'>{@item.choice}</Dropdown>

                    <TextInput name='keywords' label='Keyword'>{@item.keywords}</TextInput>

                    <TextInput name='value' label='Value'>{@item.value}</TextInput>

                    <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>

                    <ButtonGroup name='random_amount' label='Randomize amount' options='{random}'>{@item.random_amount}</ButtonGroup>

                    <NumberInput name='max_amount' label='Max amount'>{@item.max_amount}</NumberInput>

                    <NumberInput name='min_amount' label='Min amount'>{@item.min_amount}</NumberInput>
                </Form>

            </Group>


        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, configs, cost, restricted, allowed, condition,
            types: keys(types).map(key => ({ value: key, label: types[key] })),
            modes: keys(ACTION_MODE).map(key => ({ value: key, label: ACTION_MODE[key] })),
            targets: composeFromObject(ACTION_TARGET),
            resources: [],
            conditions: [],
            choices: [],
            factions: [],
            tokens: [],
            actions: [],
            stacks: [],
            random: composeBooleanOptions()
        },
    }, true);

    return result as BaseControl[];
};

