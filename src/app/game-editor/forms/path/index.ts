import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { PathEntity } from "@app/game-mechanics";
import { composeEntityOptions } from "../helpers";

export const composePathForm: FormDefinition = (data: PathEntity, ent?: ConnectedEntities) => {

    data = data || {};
    const risk = data.risk || [];
    const enable = data.enable || [];
    const disable = data.disable || [];
    const setups = data.setups || [];

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            <NumberInput name='game' hidden='{true}'>{data.game}</NumberInput>
            <NumberInput name='stage' hidden='{true}'>{data.stage}</NumberInput>
            
            <Dropdown name='from_slot' label='From' options='{slots}' showImage='{true}'>{data.from_slot}</Dropdown>
            <Dropdown name='to_slot' label='To' options='{slots}' showImage='{true}'>{data.to_slot}</Dropdown>

            <Dropdown name='board' label='Board' options='{stages}' showImage='{true}'>{data.board}</Dropdown>

            <ButtonGroup name='disable' label='Restrict' options='{conditions}' multiple='{true}'>{disable}</ButtonGroup>

            <ButtonGroup name='enable' label='Allow' options='{conditions}' multiple='{true}'>{enable}</ButtonGroup>

            <ButtonGroup name='risk' label='Risk' options='{sources}' multiple='{true}'>{risk}</ButtonGroup>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, risk, enable, disable, setups,
            stages: composeEntityOptions(ent, 'stages'),
            slots: composeEntityOptions(ent, 'slots'),
            conditions: composeEntityOptions(ent, 'conditions'),
            sources: composeEntityOptions(ent, 'sources'),
            setup_options: composeEntityOptions(ent, 'setups'),
            
        },
    }, true);

    return result as BaseControl[];


};