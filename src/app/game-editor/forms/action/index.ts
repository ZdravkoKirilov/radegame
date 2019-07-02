import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types, GameEntity,
} from '@app/game-mechanics';
import {
    composeFromObject, baseTemplate, composeCommonFormContext
} from '../helpers';

export const composeActivityForm: FormDefinition = (data: GameAction, ent: ConnectedEntities) => {
    data = data || {};
    const configs = data.configs || [];

    const template = `
        <Form>
            ${baseTemplate}

            <Group name='configs' label='Action configs' children='{configs}' item='@item' addButtonText='Add'>

                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}' required='{true}'>{@item.type}</Dropdown>

                    <Dropdown name='target' label='Target' options='{expression_options}' required='{true}'>{@item.target}</Dropdown>

                    <Dropdown name='subject' label='Subject' options='{expression_options}' required='{true}'>{@item.subject}</Dropdown>

                    <ButtonGroup name='auto_apply' label='Auto apply' options='{boolean_options}'>{@item.auto_apply}</ButtonGroup>

                    <TextInput name='value' label='Value'>{@item.value}</TextInput>

                </Form>

            </Group>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data, configs,
            types: composeFromObject(types),
        },
    }, true);

    return result as BaseControl[];
};

