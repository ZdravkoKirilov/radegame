import { Stage } from '@app/game-mechanics';
import { BaseControl, parse } from '@app/dynamic-forms';

export function composeStageForm(data: Stage = {}): BaseControl[] {
    data = data || {};

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='image' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <NumberInput name='width' label='Width' defaultValue='{100}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' defaultValue='{100}'>{data.height}</NumberInput>

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
