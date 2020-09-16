import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { baseTemplate, composeCommonFormContext, composeInlineStyleFormContext, framesTemplate, UITemplate, textsTemplate } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    const frames = data.frames || [];
    const texts = data.texts || [];

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        ${baseTemplate}

        ${UITemplate}

        ${framesTemplate}

        ${textsTemplate}
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent),
            ...composeInlineStyleFormContext(ent),
            data, frames, texts,
        }
    }, true) as BaseControl[];

    return result;
};