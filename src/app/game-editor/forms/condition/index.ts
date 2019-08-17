import { Condition } from "@app/game-mechanics";
import { ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import {
    baseTemplate,
    stakesTemplate, composeCommonFormContext
} from "../helpers";

export function composeConditionForm(data: Condition, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const passes = data.passes || [];
    const fails = data.fails || [];

    const template = `
    <Form>
        ${baseTemplate}

        <Dropdown name='clause' label='Clause' options='{expression_options}'>
            {data.clause}
        </Dropdown>

        ${stakesTemplate}
        
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, passes, fails,
        },
    }, true);

    return result as BaseControl[];
}
