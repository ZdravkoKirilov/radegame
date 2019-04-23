import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { PathEntity, GameEntity } from "@app/game-mechanics";
import { baseTemplate, permissionsTemplate, setupsTemplate, composeCommonFormContext, fieldTemplate, styleTemplate } from "../helpers";

export const composePathForm: FormDefinition = (data: PathEntity, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>
            <NumberInput name='owner' hidden='{true}'>{data.stage}</NumberInput>

            ${baseTemplate}
            
            <Dropdown name='from_slot' label='From' options='{slot_options}' showImage='{true}'>{data.from_slot}</Dropdown>
            <Dropdown name='to_slot' label='To' options='{slot_options}' showImage='{true}'>{data.to_slot}</Dropdown>

            ${styleTemplate}

            ${fieldTemplate}

            ${permissionsTemplate}

            ${setupsTemplate}

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
        },
    }, true);

    return result as BaseControl[];
};