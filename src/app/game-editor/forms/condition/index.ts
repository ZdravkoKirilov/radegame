import { Condition } from "@app/game-mechanics";
import { ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import {
    baseTemplate,
    composeCommonFormContext,
} from "../helpers";

export function composeConditionForm(data: Condition, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>
        ${baseTemplate}

        <CodeEditor name='clause' label='Clause'>
            {data.clause}
        </CodeEditor>

        <CodeEditor name='passes' label='Passes'>
            {data.passes}
        </CodeEditor>

        <CodeEditor name='fails' label='Fails'>
            {data.fails}
        </CodeEditor>
        
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data,
        },
    }, true);

    return result as BaseControl[];
}
