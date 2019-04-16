import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { PathEntity } from "@app/game-mechanics";

export const composeSoundForm: FormDefinition = (data: PathEntity, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>

            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
            <ImagePicker name='image' label='Add image' required='{true}'>{data.image}</ImagePicker>

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