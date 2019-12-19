import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types,
} from '@app/game-mechanics';
import {
    composeFromObject, baseTemplate, composeCommonFormContext, interactiveTemplate
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

                    <EmbeddedData
                        name='payload' 
                        label='Payload'
                        connectedEntities='{entities}' 
                        childrenDefinition='{composePayloadForm}' 
                    >
                        {@item.payload}
                    </EmbeddedData>

                </Form>

            </Group>

            ${interactiveTemplate}

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

