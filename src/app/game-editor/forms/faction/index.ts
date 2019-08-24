import { Faction } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext } from '../helpers';

export function composeFactionForm(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const stages = data.stages || [];

    const template = `
    <Form>

        ${baseTemplate}

        <ButtonGroup name='stages' label='Stages' options='{stage_options}' multiple='{true}'>{data.stages}</ButtonGroup>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, stages,
        }
    }, true) as BaseControl[];

    return result;
}