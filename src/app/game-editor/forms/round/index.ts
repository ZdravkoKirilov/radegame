import { Round } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    composeBooleanOptions, composeEntityOptions, baseTemplate, setupsTemplate, stakesTemplate, boardTemplate, settingsTemplate
} from '../helpers';

export function composeRoundForm(data: Round, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const setups = data.setups || [];
    const phases = data.phases || [];
    const settings = data.settings || [];
    const done = data.done || [];
    const undone = data.undone || [];
    const keywords = data.keywords || [];

    const template = `
    <Form>
        ${baseTemplate}

        ${setupsTemplate}

        <NumberInput name='replay_limit' label='Replay limit'>{data.replay_limit}</NumberInput>

        <NumberInput name='repeat' label='Repeat'>{data.repeat}</NumberInput>

        <ButtonGroup name='phases' label='Phases' options='{phase_options}' multiple='{true}'>{phases}</ButtonGroup>

        <TextInput name='phase_order' label='Phase order'>{data.phase_order}</TextInput>

        ${settingsTemplate}

        ${stakesTemplate}

        ${boardTemplate}

        <Dropdown name='stage' label='Stage' options='{stages}'>{data.stage}</Dropdown>


    </Form>
`;

    const result = parse({
        source: template,
        context: {
            data, settings, done, undone, phases, setups, keywords, bools: composeBooleanOptions(),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            phase_options: composeEntityOptions(ent, 'phases'),
            stages: composeEntityOptions(ent, 'stages'),
            setup_options: composeEntityOptions(ent, 'setups'),
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
            keyword_options: composeEntityOptions(ent, 'keywords'),
        },
    }, true);

    return result as BaseControl[];
}
