import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { composeEntityOptions, baseTemplate, revealTemplate, permissionsTemplate, costTemplate, conditionTemplate, settingsTemplate } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const disable = data.disable || [];
    const enable = data.enable || [];
    const cost = data.cost || [];
    const reveal_cost = data.reveal_cost || [];
    const settings = data.settings || [];

    const template = `
    <Form>

        ${baseTemplate}

        ${revealTemplate}

        ${permissionsTemplate}

        ${costTemplate}

        ${settingsTemplate}

        <Dropdown name='value' label='Value' options='{sources}'>{data.value}</Dropdown>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, cost, disable, enable, reveal_cost, settings,
            setup_options: composeEntityOptions(ent, 'setups'),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            stages: composeEntityOptions(ent, 'stages'),
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
        }
    }, true) as BaseControl[];

    return result;
};