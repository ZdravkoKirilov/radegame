import { Round } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeBooleanOptions, composeEntityOptions } from '../helpers';

export function composeRoundForm(data: Round, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const setups = data.setups || [];
    const phases = data.phases || [];
    const condition = data.condition || [];
    const done = data.done || [];
    const undone = data.undone || [];
    const risk = data.risk || [];

    const template = `
    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
        
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

        <NumberInput name='replay_limit' label='Replay limit'>{data.replay_limit}</NumberInput>

        <NumberInput name='repeat' label='Repeat'>{data.repeat}</NumberInput>

        <ButtonGroup name='phases' label='Phases' options='{phase_options}' multiple='{true}'>{phases}</ButtonGroup>

        <TextInput name='phase_order' label='Phase order'>{data.phase_order}</TextInput>

        <ButtonGroup name='condition' label='Condition' options='{conditions}' multiple='{true}'>{condition}</ButtonGroup>

        <ButtonGroup name='undone' label='Penalty' options='{sources}' multiple='{true}'>{dundone}</ButtonGroup>

        <ButtonGroup name='done' label='Award' options='{sources}' multiple='{true}'>{done}</ButtonGroup>

        <ButtonGroup name='risk' label='Risk' options='{sources}' multiple='{true}'>{risk}</ButtonGroup>

        <Dropdown name='board' label='Board' options='{stages}'>{data.board}</Dropdown>

        <Dropdown name='stage' label='Stage' options='{stages}'>{data.stage}</Dropdown>


    </Form>
`;

    const result = parse({
        source: template,
        context: {
            data, condition, done, undone, risk, phases, setups, bools: composeBooleanOptions(),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            phase_options: composeEntityOptions(ent, 'phases'),
            stages: composeEntityOptions(ent, 'stages'),
            setup_options: composeEntityOptions(ent, 'setups'),
        },
    }, true);

    return result as BaseControl[];
}
