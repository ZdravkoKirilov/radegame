import keys from 'lodash/keys';
import values from 'lodash/values';

import {
    BaseControl, Option,
    FormDefinition, ConnectedEntities, ToggleContext, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types,
    TARGET_TYPE, ACTION_MODE
} from '@app/game-mechanics';
import {
    composeResourceOptions, composeKeywordOptions,
    composeConditionOptions, composeChoiceOptions, composeFactionOptions, composeActionOptions,
} from '../helpers';

const toggleContexts: { [key: string]: ToggleContext } = {
    [types.WIN_GAME]: { show: { field: 'type', equals: [types.WIN_GAME] } },
    [types.LOSE_GAME]: { show: { field: 'type', equals: [types.LOSE_GAME] } },
    [types.TRIGGER_QUEST]: { show: { field: 'type', equals: [types.TRIGGER_QUEST] } },
    [types.TRIGGER_TRIVIA]: { show: { field: 'type', equals: [types.TRIGGER_TRIVIA] } },
    [types.MOVE]: { show: { field: 'type', equals: [types.MOVE] } },
    [types.ALTER]: { show: { field: 'type', equals: [types.ALTER] } },
    [types.COLLECT]: { show: { field: 'type', equals: [types.COLLECT] } },
    [types.DRAW]: { show: { field: 'type', equals: [types.DRAW] } }
}

const targets: { [key: string]: Option } = {
    [TARGET_TYPE.SELF]: {
        value: TARGET_TYPE.SELF,
        context: { disable: { field: 'type', equals: [types.ALTER] }, defaultValue: '' }
    },
    [TARGET_TYPE.ACTIVE_PLAYER]: {
        value: TARGET_TYPE.ACTIVE_PLAYER,
        context: { disable: { field: 'type', equals: [] }, defaultValue: '' }
    },
    [TARGET_TYPE.OTHER_PLAYER]: {
        value: TARGET_TYPE.OTHER_PLAYER,
        context: { disable: { field: 'type', equals: [] }, defaultValue: '' }
    },
    [TARGET_TYPE.PLAYER]: {
        value: TARGET_TYPE.PLAYER,
        context: { disable: { field: 'type', equals: [] }, defaultValue: '' }
    }
}

export const composeActivityForm: FormDefinition = (data: GameAction, ent: ConnectedEntities) => {
    data = data || {};
    const configs = data.configs || [];
    const cost = data.cost || [];
    const restriction = data.restriction || [];
    const condition = data.condition || [];

    const template = `
        <Form>
            <TextInput name='name' required='{true}' label='Action name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <Dropdown name='mode' label='Action mode' options='{modes}'>{data.mode}</Dropdown>

            <Group name='configs' label='Action configs' children='{configs}' item='@item' addButtonText='Add'>

                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}' required='{true}'>{@item.type}</Dropdown>

                    <Dropdown name='target' label='Target' options='{targets}' required='{true}'>{@item.target}</Dropdown>

                    <Dropdown name='action' label='Action' options='{actions}' showImage='{true}'>{@item.action}</Dropdown>

                    <Dropdown name='condition' label='Condition' options='{conditions}' showImage='{true}'>{@item.condition}</Dropdown>

                    <Dropdown name='resource' label='Resource' options='{resources}' showImage='{true}'>{@item.resource}</Dropdown>

                    <Dropdown name='faction' label='Faction' options='{factions}' showImage='{true}'>{@item.faction}</Dropdown>

                    <Dropdown name='choice' label='Choice' options='{choices}' showImage='{true}'>{@item.choice}</Dropdown>

                    <Dropdown name='keyword' label='Keyword' options='{keywords}'>{@item.keyword}</Dropdown>

                    <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>
                </Form>

            </Group>


        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, configs,
            types: keys(types).map(key => ({ value: key, label: types[key] })),
            modes: keys(ACTION_MODE).map(key => ({ value: key, label: ACTION_MODE[key] })),
            targets: values(targets),
            resources: composeResourceOptions(ent),
            conditions: composeConditionOptions(ent),
            choices: composeChoiceOptions(ent),
            factions: composeFactionOptions(ent),
            actions: composeActionOptions(ent),
            keywords: composeKeywordOptions([ent.resources])
        },
    }, true);

    return result as BaseControl[];
};

