import { Setup } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';

import { composeCommonFormContext, baseTemplate } from '../helpers';

export const composeSetupForm = (data: Setup, ent: ConnectedEntities): BaseControl[] => {
    data = data || {} as Setup;
    const languages = data.languages || [];

    const template = `
    <Form>

        ${baseTemplate}

        <NumberInput name='min_players' label='Min players'>{data.min_players}</NumberInput>

        <NumberInput name='max_players' label='Max players'>{data.max_players}</NumberInput>

        <TextInput name='recommended_age' label='Recommended age'>{data.recommended_age}</TextInput>

        <Group name='languages' label='Languages' children='{languages}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' label='Name'>{@item.name}</TextInput>

                <TextInput name='display_name' label='Display name'>{@item.display_name}</TextInput>

                <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{@item.image}</Dropdown>

            </Form>
        </Group>

        <CodeEditor name='get_active_module' label='Get active module' required='{true}'>
            {data.get_active_module}
        </CodeEditor>

        <CodeEditor name='get_active_language' label='Get active language'>
            {data.get_active_language}
        </CodeEditor>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, languages
        }
    }, true) as BaseControl[];

    return result;
};
