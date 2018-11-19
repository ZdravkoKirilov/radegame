import { Choice, CHOICE_MODE } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeFromObject, composeEntityOptions } from '../helpers';

export function composeChoiceForm(data: Choice, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const options = data.options || [];
    const cost = data.cost || [];
    const restricted = data.restricted || [];
    const allowed = data.allowed || [];
    const condition = data.condition || [];
    const setups = data.setups || [];

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Choice name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

        <Dropdown name='mode' label='Mode' options='{modes}'>{data.mode}</Dropdown>

        <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

        <NumberInput name='reveal_cost' label='Reveal cost'>{data.reveal_cost}</NumberInput>

        <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>

        <ButtonGroup name='restricted' label='Restrict' options='{conditions}' multiple='{true}'>{restricted}</ButtonGroup>

        <ButtonGroup name='allowed' label='Allow' options='{conditions}' multiple='{true}'>{allowed}</ButtonGroup>

        <ButtonGroup name='condition' label='Condition' options='{conditions}' multiple='{true}'>{condition}</ButtonGroup>

        <ButtonGroup name='settings' label='Settings' options='{sources}' multiple='{true}'>{settings}</ButtonGroup>

        <ButtonGroup name='done' label='Award' options='{sources}' multiple='{true}'>{done}</ButtonGroup>

        <ButtonGroup name='undone' label='Penalty' options='{sources}' multiple='{true}'>{undone}</ButtonGroup>

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <NumberInput name='owner' hidden='{true}'>{@item.owner}</NumberInput>

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
            data, options, cost, condition, restricted, allowed, setups,
            sources: composeEntityOptions(ent, 'sources'),
            modes: composeFromObject(CHOICE_MODE),
            setup_options: composeEntityOptions(ent, 'setups'),
        },
    }, true);

    return result as BaseControl[];
}