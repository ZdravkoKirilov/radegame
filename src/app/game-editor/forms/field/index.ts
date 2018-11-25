import { Field } from '@app/game-mechanics';
import { ConnectedEntities, FormDefinition, parse, BaseControl } from '@app/dynamic-forms';
import { composeEntityOptions } from '../helpers';

export const composeFieldForm: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    const cost = data.cost || [];
    const risk = data.risk || [];
    const done = data.done || [];
    const undone = data.undone || [];

    const template = `
        <Form>
            <TextInput name='name' required='{true}' label='Action name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <Dropdown name='board' label='Board' options='{stages}' showImage='{true}'>{data.board}</Dropdown>

            <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>

            <ButtonGroup name='risk' label='Risk' options='{sources}' multiple='{true}'>{risk}</ButtonGroup>

            <ButtonGroup name='done' label='Award' options='{sources}' multiple='{true}'>{done}</ButtonGroup>

            <ButtonGroup name='undone' label='Penalty' options='{sources}' multiple='{true}'>{undone}</ButtonGroup>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, cost, risk, done, undone,
            stages: composeEntityOptions(ent, 'stages'),
            sources: composeEntityOptions(ent, 'sources'),
        },
    }, true);

    return result as BaseControl[];
};
