import { Text } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    baseTemplate, composeCommonFormContext, keywordsTemplate, framesTemplate, imageTemplate, displayNameTemplate
} from '../helpers';

export function composeTextForm(data: Text, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const keywords = data.keywords || [];
    const translations = data.translations || [];

    const template = `
    <Form>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='default_value' label='Default value'>{data.default_value}</TextInput>

        ${keywordsTemplate}

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
            data, keywords, translations
        },
    }, true);

    return result as BaseControl[];
}