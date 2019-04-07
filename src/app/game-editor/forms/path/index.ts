import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { PathEntity } from "@app/game-mechanics";
import { composeEntityOptions, baseTemplate, permissionsTemplate, stakesTemplate,
     riskTemplate, boardTemplate, costTemplate, setupsTemplate } from "../helpers";

export const composePathForm: FormDefinition = (data: PathEntity, ent?: ConnectedEntities) => {

    data = data || {};
    const risk = data.risk || [];
    const enable = data.enable || [];
    const disable = data.disable || [];
    const cost = data.cost || [];
    const done = data.done || [];
    const undone = data.undone || [];
    const keywords = data.keywords || [];

    const template = `
        <Form>
            <NumberInput name='owner' hidden='{true}'>{data.stage}</NumberInput>

            ${baseTemplate}
            
            <Dropdown name='from_slot' label='From' options='{slots}' showImage='{true}'>{data.from_slot}</Dropdown>
            <Dropdown name='to_slot' label='To' options='{slots}' showImage='{true}'>{data.to_slot}</Dropdown>

            ${boardTemplate}

            ${permissionsTemplate}

            ${costTemplate}

            ${stakesTemplate}

            ${riskTemplate}

            ${setupsTemplate}

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, risk, enable, disable, cost, done, undone, keywords,
            stages: composeEntityOptions(ent, 'stages'),
            slots: composeEntityOptions(ent, 'slots'),
            conditions: composeEntityOptions(ent, 'conditions'),
            sources: composeEntityOptions(ent, 'sources'),
            setup_options: composeEntityOptions(ent, 'setups'),
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
            keyword_options: composeEntityOptions(ent, 'keywords'),
        },
    }, true);

    return result as BaseControl[];


};