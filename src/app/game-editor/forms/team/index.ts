import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Team } from "@app/game-mechanics";
import { composeEntityOptions, baseTemplate, setupsTemplate, boardTemplate, settingsTemplate } from "../helpers";

export const composeTeamForm: FormDefinition = (data: Team, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    const setups = data.setups || [];
    const settings = data.settings || [];

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
            data, setups, settings,
            stages: composeEntityOptions(ent, 'stages'),
            setup_options: composeEntityOptions(ent, 'setups'),
            conditions: composeEntityOptions(ent, 'conditions'),
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
        }
    }, true) as BaseControl[];

    return result;
};