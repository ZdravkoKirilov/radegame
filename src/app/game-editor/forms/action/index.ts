import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types,
} from '@app/game-mechanics';
import {
    composeFromObject, baseTemplate, composeCommonFormContext, framesTemplate, displayNameTemplate
} from '../helpers';

export const composeActivityForm: FormDefinition = (data: GameAction, ent: ConnectedEntities) => {
    data = data || {};
    const configs = data.configs || [];
    const frames = data.frames || [];

    const template = `
        <Form>
            ${baseTemplate}

            ${displayNameTemplate}

            <Group name='configs' label='Action configs' children='{configs}' item='@item' addButtonText='Add'>

                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}' required='{true}'>{@item.type}</Dropdown>

                    <Dropdown name='target' label='Target' options='{expression_options}'>{@item.target}</Dropdown>

                    <Dropdown name='subject' label='Subject' options='{expression_options}'>{@item.subject}</Dropdown>

                    <Dropdown name='value' label='Value' options='{expression_options}'>{@item.value}</Dropdown>

                </Form>

            </Group>

            ${framesTemplate}

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, configs, frames,
            types: composeFromObject(types),
        },
    }, true);

    return result as BaseControl[];
};

