import { Choice, CHOICE_MODE } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeStackOptions, composeFromObject } from '../helpers';

export function composeChoiceForm(data: Choice, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const options = data.options || [];
    const cost = data.cost || [];
    const restricted = data.restricted || [];
    const allowed = data.allowed || [];
    const condition = data.condition || [];

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Choice name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <Dropdown name='mode' label='Mode' options='{modes}'>{data.mode}</Dropdown>

        <ButtonGroup name='cost' label='Cost' options='{stacks}' multiple='{true}'>{cost}</ButtonGroup>

        <ButtonGroup name='restricted' label='Restrict' options='{stacks}' multiple='{true}'>{restricted}</ButtonGroup>

        <ButtonGroup name='allowed' label='Allow' options='{stacks}' multiple='{true}'>{allowed}</ButtonGroup>

        <ButtonGroup name='condition' label='Condition' options='{stacks}' multiple='{true}'>{condition}</ButtonGroup>

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <NumberInput name='owner' hidden='{true}'>{@item.owner}</NumberInput>

                <TextInput name='name' required='{true}' label='Choice name'>{@item.name}</TextInput>

                <TextInput name='description' label='Description'>{@item.description}</TextInput>
        
                <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{@item.image}</ImagePicker>
        
                <TagsInput name='keywords' label='Keywords'>{@item.keywords}</TagsInput>

                <ButtonGroup name='effect' label='Effect' options='{stacks}' multiple='{true}'>{@item.effect}</ButtonGroup>
                
            </Form>

        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, options, cost, condition, restricted, allowed,
            stacks: composeStackOptions(ent),
            modes: composeFromObject(CHOICE_MODE)
        },
    }, true);

    return result as BaseControl[];
}