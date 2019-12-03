import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { baseTemplate, composeCommonFormContext, framesTemplate, composeInlineStyleFormContext } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const frames = data.frames || [];

    const template = `
    <Form>

        ${baseTemplate}

        ${framesTemplate}

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            ...composeInlineStyleFormContext(ent),
            frames,
            data,
        }
    }, true) as BaseControl[];

    return result;
};