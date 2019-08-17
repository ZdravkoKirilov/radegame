import { Choice } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    baseTemplate, composeCommonFormContext
} from '../helpers';

export function composeChoiceForm(data: Choice, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const options = data.options || [];

    const template = `
    <Form>
        ${baseTemplate}

        <ButtonGroup name='random' label='Random' options='{boolean_options}'>{data.random}</ButtonGroup>

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' required='{true}' label='Option name'>{@item.name}</TextInput>

                <TextInput name='description' label='Description'>{@item.description}</TextInput>
        
                <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{data.image}</Dropdown>

                <Dropdown name='effect' label='Effect' options='{expression_options}'>{@item.effect}</Dropdown>
                
            </Form>

        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, options,
        },
    }, true);

    return result as BaseControl[];
}