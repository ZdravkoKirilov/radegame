import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot } from "@app/game-mechanics";
import { composeEntityOptions, baseTemplate, setupsTemplate, boardTemplate, permissionsTemplate, riskTemplate, settingsTemplate } from "../helpers";

export const composeSlotForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {

    data = data || {};
    const setups = data.setups || [];
    const disable = data.disable || [];
    const enable = data.enable || [];
    const risk = data.risk || [];
    const settings = data.settings || [];
    const revealed = data.revealed || [];

    const template = `
        <Form>
            ${baseTemplate}

            ${setupsTemplate}

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            <NumberInput name='width' label='Width' defaultValue='{100}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' defaultValue='{100}'>{data.height}</NumberInput>

            <Dropdown name='field' label='Field' options='{fields}'>{data.field}</Dropdown>

            ${boardTemplate}

            <ButtonGroup name='tokens' label='Tokens' options='{tokens}' multiple='true'>{data.tokens}</ButtonGroup>

            <Dropdown name='source' label='Source' options='{sources}'>
                {source}
            </Dropdown>

            ${permissionsTemplate}

            ${riskTemplate}

            ${settingsTemplate}

            <Dropdown name='revealed' label='Revealed' options='{sources}'>
                {revealed}
            </Dropdown>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, setups, enable, disable, risk, settings, revealed,
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