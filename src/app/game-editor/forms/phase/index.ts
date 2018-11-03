import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    Resource
} from '@app/game-mechanics';

export const composePhaseForm: FormDefinition = (data: Resource, ent?: ConnectedEntities) => {
    data = data || {};

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data
        },
    }, true);

    return result as BaseControl[];
};

