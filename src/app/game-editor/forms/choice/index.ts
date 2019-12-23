import { Choice } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    baseTemplate, composeCommonFormContext
} from '../helpers';

export function composeChoiceForm(data: Choice, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const options = data.options || [];
    const tips = data.tips || [];

    const template = `
    <Form>
        ${baseTemplate}

        <CodeEditor name='chances' label='Chances'>
            {data.chances}
        </CodeEditor>

        <CodeEditor name='time' label='Time limit'>
            {data.time}
        </CodeEditor>

        <CodeEditor name='computed_options' label='Compute options'>
            {data.computed_options}
        </CodeEditor>

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' required='{true}' label='Option name'>{@item.name}</TextInput>

                <TextInput name='description' label='Description'>{@item.description}</TextInput>

                <TagsInput name='keywords' label='Keywords'>{@item.keywords}</TagsInput>
        
                <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{data.image}</Dropdown>

                <CodeEditor name='effect' label='Effect'>{@item.effect}</CodeEditor>
                
            </Form>
        </Group>

        <Group name='tips' label='Tips' children='{tips}' item='@tip' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@tip.id}</NumberInput>

                <TextInput name='description' label='Description'>{@tip.description}</TextInput>

                <Dropdown name='image' label='Image' options='{image_options}'>{@tip.image}</Dropdown>

                <TagsInput name='keywords' label='Keywords'>{@tip.keywords}</TagsInput>
                
            </Form>
        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, options, tips,
        },
    }, true);

    return result as BaseControl[];
}