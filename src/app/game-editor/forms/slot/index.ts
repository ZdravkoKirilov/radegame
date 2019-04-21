import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot } from "@app/game-mechanics";
import {
    baseTemplate,
    boardTemplate, permissionsTemplate, styleTemplate,
    keywordsTemplate,
    composeCommonFormContext,
    fieldTemplate
} from "../helpers";

export const composeSlotForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            ${fieldTemplate}

            ${boardTemplate}

            ${permissionsTemplate}

            ${styleTemplate}

            ${keywordsTemplate}

            <Dropdown name='draw' label='Draw' options='{source_options}'>
                {data.draw}
            </Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent, data),
            data,
        },
    }, true);

    return result as BaseControl[];
};