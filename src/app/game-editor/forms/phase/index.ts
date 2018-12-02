import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Phase } from '@app/game-mechanics';
import { composeEntityOptions, baseTemplate, setupsTemplate, settingsTemplate } from '../helpers';

export const composePhaseForm: FormDefinition = (data: Phase, ent?: ConnectedEntities) => {
    data = data || {} as Phase;
    const settings = data.settings || [];
    const setups = data.setups || [];

    const template = `
        <Form>
            ${baseTemplate}

            ${setupsTemplate}

            <NumberInput name='turn_cycles' label='Turn cycles'>{data.turn_cycles}</NumberInput>

            ${settingsTemplate}

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, settings, setups,
            conditions: composeEntityOptions(ent, 'conditions'),
            setup_options: composeEntityOptions(ent, 'setups')
        },
    }, true);

    return result as BaseControl[];
};

