import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot, SLOT_SHAPES } from "@app/game-mechanics";
import {
    composeEntityOptions, baseTemplate, setupsTemplate,
    boardTemplate, permissionsTemplate, riskTemplate, settingsTemplate,
    composeFromObject
} from "../helpers";

export const composeSlotForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {

    data = data || {};
    const setups = data.setups || [];
    const disable = data.disable || [];
    const enable = data.enable || [];
    const risk = data.risk || [];
    const settings = data.settings || [];

    const template = `
        <Form>
            ${baseTemplate}

            ${setupsTemplate}

            <Dropdown name="shape" label="Shape" defaultValue='rectangle' options='{shapes}' required='true'>
                {data.shape}
            </Dropdown>

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            <NumberInput name='width' label='Width / Radius' defaultValue='{100}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' defaultValue='{100}'>{data.height}</NumberInput>

            <TextInput name='points' label='Points'>{data.points}</TextInput>

            <Dropdown name='field' label='Field' options='{fields}'>{data.field}</Dropdown>

            ${boardTemplate}

            <Dropdown name='draw' label='Draw' options='{sources}'>
                {data.draw}
            </Dropdown>

            ${permissionsTemplate}

            ${riskTemplate}

            ${settingsTemplate}

            <Dropdown name='revealed' label='Revealed' options='{sources}'>
                {data.revealed}
            </Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, setups, enable, disable, risk, settings,
            shapes: composeFromObject(SLOT_SHAPES),
            setup_options: composeEntityOptions(ent, 'setups'),
            conditions: composeEntityOptions(ent, 'conditions'),
            sources: composeEntityOptions(ent, 'sources'),
            fields: composeEntityOptions(ent, 'fields'),
            tokens: composeEntityOptions(ent, 'tokens'),
            stages: composeEntityOptions(ent, 'stages')
        },
    }, true);

    return result as BaseControl[];


};