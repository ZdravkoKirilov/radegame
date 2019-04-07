import { Faction } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeEntityOptions, baseTemplate, setupsTemplate, boardTemplate, settingsTemplate } from '../helpers';

export function composeFactionForm(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const setups = data.setups || [];
    const settings = data.settings || [];
    const keywords = data.keywords || [];

    const template = `
    <Form>

        ${baseTemplate}

        ${setupsTemplate}

        ${boardTemplate}

        ${settingsTemplate}

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, setups, settings, keywords,
            setup_options: composeEntityOptions(ent, 'setups'),
            conditions: composeEntityOptions(ent, 'conditions'),
            stages: composeEntityOptions(ent, 'stages'),
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
            keyword_options: composeEntityOptions(ent, 'keywords'),
        }
    }, true) as BaseControl[];

    return result;
}