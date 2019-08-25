import { Faction } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext } from '../helpers';

export function composeFactionForm(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const slots = data.slots || [];

    const template = `
    <Form>

        ${baseTemplate}

        <ButtonGroup name='slots' label='Slots' options='{slot_options}' multiple='{true}'>{data.slots}</ButtonGroup>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, stages: slots,
        }
    }, true) as BaseControl[];

    return result;
}