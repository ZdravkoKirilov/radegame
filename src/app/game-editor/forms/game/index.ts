import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';
import { Game } from '@app/game-mechanics';

export function composeGameForm(data: Game, ent: ConnectedEntities): BaseControl[] {
    data = data || {} as Game;
    const setups = data.setups || [];

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='title' required='{true}' label='Title'>{data.title}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <Group name='setups' label='Game setups' children='{setups}' item='@item' addButtonText='Add setup'>

                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <TextInput name='name' required='{true}' label='Name'>{@item.name}</TextInput>

                    <TextInput name='description' label='Description'>{@item.description}</TextInput>
        
                    <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{@item.image}</ImagePicker>

                    <NumberInput name='min_players' label='Min players'>{@item.min_players}</NumberInput>

                    <NumberInput name='max_players' label='Max players'>{@item.max_players}</NumberInput>

                    <TextInput name='recommended_age' label='Recommended age'>{@item.recommended_age}</TextInput>
                
                </Form>

            </Group>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, setups,
        },
    }, true);

    return result as BaseControl[];
}