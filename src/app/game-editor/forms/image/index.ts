import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { ImageAsset } from "@app/game-mechanics";
import { keywordsTemplate } from "../helpers";


export const composeImageForm: FormDefinition = (data: ImageAsset, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>

            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
            <ImagePicker name='image' label='Add image' required='{true}'>{data.image}</ImagePicker>

            ${keywordsTemplate}

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