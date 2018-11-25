import { Choice, CHOICE_MODE } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeFromObject, composeEntityOptions } from '../helpers';

export function composeChoiceForm(data: Choice, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const options = data.options || [];
    const cost = data.cost || [];
    const disable = data.disable || [];
    const enable = data.enable || [];
    const condition = data.condition || [];
    const reveal_cost = data.reveal_cost || [];
    const done = data.done || [];
    const undone = data.undone || [];

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Choice name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <Dropdown name='mode' label='Mode' options='{modes}'>{data.mode}</Dropdown>

        <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

        <ButtonGroup name='reveal_cost' label='Reveal cost' options='{sources}' multiple='true'>
            {reveal_cost}
        </ButtonGroup>

        <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>

        <ButtonGroup name='disable' label='Restrict' options='{conditions}' multiple='{true}'>{disable}</ButtonGroup>

        <ButtonGroup name='enable' label='Allow' options='{conditions}' multiple='{true}'>{enable}</ButtonGroup>

        <ButtonGroup name='condition' label='Condition' options='{conditions}' multiple='{true}'>{condition}</ButtonGroup>

        <ButtonGroup name='done' label='Award' options='{sources}' multiple='{true}'>{done}</ButtonGroup>

        <ButtonGroup name='undone' label='Penalty' options='{sources}' multiple='{true}'>{undone}</ButtonGroup>

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' required='{true}' label='Choice name'>{@item.name}</TextInput>

                <TextInput name='description' label='Description'>{@item.description}</TextInput>
        
                <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{@item.image}</ImagePicker>
        
                <TagsInput name='keywords' label='Keywords'>{@item.keywords}</TagsInput>

                <ButtonGroup name='effect' label='Effect' options='{sources}' multiple='{true}'>{@item.effect}</ButtonGroup>

                <TextInput name='value' label='Value'>{@item.value}</TextInput>

                <ButtonGroup name='settings' label='Settings' options='{conditions}' multiple='{true}'>
                    {@item.settings}
                </ButtonGroup>
                
            </Form>

        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, options, cost, condition, disable, enable, reveal_cost, done, undone,
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            modes: composeFromObject(CHOICE_MODE),
        },
    }, true);

    return result as BaseControl[];
}