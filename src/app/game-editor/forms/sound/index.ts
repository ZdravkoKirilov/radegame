import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Sound, GameEntity } from "@app/game-mechanics";
import { composeCommonFormContext, baseTemplate } from "../helpers";

export const composeSoundForm: FormDefinition = (data: Sound, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>

            ${baseTemplate}
            <FilePicker name='file' label='Sound file' required='{true}'>{data.file}</FilePicker>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
        },
    }, true);

    return result as BaseControl[];
};