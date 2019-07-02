import { Choice, GameEntity } from '@app/game-mechanics';
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

        <ButtonGroup name='secret' label='Secret' options='{boolean_options}'>{data.secret}</ButtonGroup>

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' required='{true}' label='Choice name'>{@item.name}</TextInput>

                <TextInput name='description' label='Description'>{@item.description}</TextInput>
        
                <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{@item.image}</ImagePicker>

                <Dropdown name='effect' label='Effect' options='{sources}'>{@item.effect}</Dropdown>

                <ButtonGroup name='secret' label='Secret effect' options='{boolean_options}'>{@item.secret}</ButtonGroup>

                <TextInput name='value' label='Value'>{@item.value}</TextInput>
                
            </Form>

        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data, options,
        },
    }, true);

    return result as BaseControl[];
}