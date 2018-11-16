import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { PathEntity } from "@app/game-mechanics";
import { composeEntityOptions } from "../helpers";

export const composePathForm: FormDefinition = (data: PathEntity, ent?: ConnectedEntities) => {

    data = data || {};
    const risk = data.risk || [];
    const allowed = data.allowed || [];
    const restricted = data.restricted || [];
    const settings = data.settings || [];
    const setups = data.setups || [];

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            <NumberInput name='game' hidden='{true}'>{data.game}</NumberInput>
            <NumberInput name='stage' hidden='{true}'>{data.stage}</NumberInput>
            
            <Dropdown name='from_slot' label='From' options='{slots}' showImage='{true}'>{data.from_slot}</Dropdown>
            <Dropdown name='to_slot' label='To' options='{slots}' showImage='{true}'>{data.to_slot}</Dropdown>

            <Dropdown name='board' label='Board' options='{stages}' showImage='{true}'>{data.board}</Dropdown>

            <ButtonGroup name='restricted' label='Restrict' options='{conditions}' multiple='{true}'>{restricted}</ButtonGroup>

            <ButtonGroup name='allowed' label='Allow' options='{conditions}' multiple='{true}'>{allowed}</ButtonGroup>

            <ButtonGroup name='risk' label='Risk' options='{sources}' multiple='{true}'>{risk}</ButtonGroup>

            <ButtonGroup name='settings' label='Settings' options='{conditions}' multiple='{true}'>{settings}</ButtonGroup>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, risk, allowed, restricted, settings, setups,
            stages: composeEntityOptions(ent, 'stages'),
            slots: composeEntityOptions(ent, 'slots'),
            conditions: composeEntityOptions(ent, 'conditions'),
            sources: composeEntityOptions(ent, 'sources'),
            setup_options: composeEntityOptions(ent, 'setups'),
            
        },
    }, true);

    return result as BaseControl[];


};