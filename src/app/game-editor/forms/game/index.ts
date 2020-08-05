import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';
import { Game } from '@app/game-mechanics';
import { composeCommonFormContext } from '../helpers';

export function composeGameForm(data: Game, ent: ConnectedEntities): BaseControl[] {
    data = data || {} as Game;

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='title' required='{true}' label='Title'>{data.title}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data
        },
    }, true);

    return result as BaseControl[];
}