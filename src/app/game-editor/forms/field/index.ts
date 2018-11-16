import { Field } from '@app/game-mechanics';
import { ConnectedEntities, FormDefinition, parse, BaseControl } from '@app/dynamic-forms';
import { composeEntityOptions } from '../helpers';

export const composeFieldForm: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    const cost = data.cost || [];
    const risk = data.risk || [];
    const setups = data.setups || [];

    const template = `
        <Form>
            <TextInput name='name' required='{true}' label='Action name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

            <Dropdown name='board' label='Board' options='{stages}' showImage='{true}'>{data.board}</Dropdown>

            <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>

            <ButtonGroup name='risk' label='Risk' options='{sources}' multiple='{true}'>{risk}</ButtonGroup>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, cost, risk, setups,
            setup_options: composeEntityOptions(ent, 'setups'),
            stages: composeEntityOptions(ent, 'stages'),
            sources: composeEntityOptions(ent, 'sources'),
        },
    }, true);

    return result as BaseControl[];
};
