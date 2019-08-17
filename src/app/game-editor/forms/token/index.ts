import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { composeEntityOptions, baseTemplate, revealTemplate, permissionsTemplate, costTemplate, conditionTemplate, settingsTemplate, keywordsTemplate, composeCommonFormContext } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const keywords = data.keywords || [];

    const template = `
    <Form>

        ${baseTemplate}

        <Dropdown name='value' label='Value' options='{expression_options}'>{data.value}</Dropdown>

        ${keywordsTemplate}

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            keywords,
            data,
        }
    }, true) as BaseControl[];

    return result;
};