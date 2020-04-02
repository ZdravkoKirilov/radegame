import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types, ActionParam,
} from '@app/game-mechanics';
import {
    composeFromObject, baseTemplate, composeCommonFormContext, UITemplate
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

                    <Group name='payload' label='Payload' children='{@item.payload}' addButtonText='Add' item='@param'>
                        <Form>
                            <NumberInput name='id' hidden='{true}'>{@param.id}</NumberInput>
                            <TextInput name='key' required='{true}' label='Key'>
                                {@param.key}
                            </TextInput>
                    
                            <TextInput name='value' required='{true}' label='Value'>
                                {@param.value}
                            </TextInput>
                        </Form>
                    </Group>

                </Form>

            </Group>

            ${UITemplate}

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, configs, frames, entities: ent,
            types: composeFromObject(types), composePayloadForm
        },
    }, true);

    return result as BaseControl[];
};

const composePayloadForm: FormDefinition = (data: GameAction, ent: ConnectedEntities) => {
    data = data || {};

    const template = `
    <Form>
        <TextInput name='key' required='{true}' label='Key'>
            {data.key}
        </TextInput>

        <TextInput name='value' required='{true}' label='Value'>
            {data.value}
        </TextInput>
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data,
        },
    }, true);

    return result as BaseControl[];
};

