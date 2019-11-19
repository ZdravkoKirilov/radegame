import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { baseTemplate, keywordsTemplate, composeCommonFormContext, framesTemplate, composeInlineStyleFormContext } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const keywords = data.keywords || [];
    const frames = data.frames || [];

    const template = `
    <Form>

        ${baseTemplate}

        ${keywordsTemplate}

        ${framesTemplate}

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            ...composeInlineStyleFormContext(ent),
            keywords, frames,
            data,
        }
    }, true) as BaseControl[];

    return result;
};