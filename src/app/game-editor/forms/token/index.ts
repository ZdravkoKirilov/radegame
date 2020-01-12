import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { baseTemplate, composeCommonFormContext, composeInlineStyleFormContext } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const template = `
    <Form>
        ${baseTemplate}
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            ...composeInlineStyleFormContext(ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
};