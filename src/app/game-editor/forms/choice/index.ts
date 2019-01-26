import { Choice, CHOICE_MODE } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    composeFromObject, composeEntityOptions, baseTemplate, revealTemplate,
    costTemplate, permissionsTemplate, conditionTemplate, stakesTemplate, composeBooleanOptions
} from '../helpers';

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
        ${baseTemplate}

        <Dropdown name='mode' label='Mode' options='{modes}'>{data.mode}</Dropdown>

        <ButtonGroup name='random' label='Random' options='{bools}'>{data.random}</ButtonGroup>

        ${revealTemplate}

        ${costTemplate}

        ${permissionsTemplate}

        ${conditionTemplate}

        ${stakesTemplate}

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>

            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' required='{true}' label='Choice name'>{@item.name}</TextInput>

                <TextInput name='description' label='Description'>{@item.description}</TextInput>
        
                <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{@item.image}</ImagePicker>
        
                <TagsInput name='keywords' label='Keywords'>{@item.keywords}</TagsInput>

                <ButtonGroup name='effect' label='Effect' options='{sources}' multiple='{true}'>{@item.effect}</ButtonGroup>

                <ButtonGroup name='secret' label='Secret effect' options='{bools}'>{@item.secret}</ButtonGroup>

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
            bools: composeBooleanOptions()
        },
    }, true);

    return result as BaseControl[];
}