import { Text } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    composeCommonFormContext, baseTemplate, styleTemplate, composeInlineStyleFormContext
} from '../helpers';

export function composeTextForm(data: Text, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const translations = data.translations || [];

    const template = `
    <Form>

        ${baseTemplate}

        <TextInput name='default_value' label='Default value'>{data.default_value}</TextInput>

        ${styleTemplate}

        <Group name='translations' label='Translations' children='{translations}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='value' required='{true}' label='Value'>{@item.value}</TextInput>

                <Dropdown name='language' label='Language' options='{language_options}' showImage='{true}'>{@item.language}</Dropdown>

            </Form>
        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            ...composeInlineStyleFormContext(ent),
            data, translations
        },
    }, true);

    return result as BaseControl[];
}