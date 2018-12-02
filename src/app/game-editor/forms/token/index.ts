import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { composeEntityOptions, baseTemplate, revealTemplate, permissionsTemplate, costTemplate, conditionTemplate } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const disable = data.disable || [];
    const enable = data.enable || [];
    const cost = data.cost || [];
    const reveal_cost = data.reveal_cost || [];
    const condition = data.condition || [];

    const template = `
    <Form>

        ${baseTemplate}

        ${revealTemplate}

        ${permissionsTemplate}

        ${costTemplate}

        ${conditionTemplate}

        <Dropdown name='attributes' label='Attributes' options='{sources}'>{data.attributes}</Dropdown>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, cost, disable, enable, reveal_cost, condition,
            setup_options: composeEntityOptions(ent, 'setups'),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            stages: composeEntityOptions(ent, 'stages'),
        }
    }, true) as BaseControl[];

    return result;
};