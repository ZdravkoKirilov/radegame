import { FormDefinition, BaseControl, parse } from "@app/dynamic-forms";
import { ImageAsset } from "@app/game-mechanics";
import { baseTemplate } from "../helpers";

export const composeImageForm: FormDefinition = (data: ImageAsset) => {

    data = data || {};

    const template = `
        <Form>

            ${baseTemplate}

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