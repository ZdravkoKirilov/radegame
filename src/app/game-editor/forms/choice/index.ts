import { Choice } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    baseTemplate, composeCommonFormContext, keywordsTemplate, framesTemplate, imageTemplate, displayNameTemplate
} from '../helpers';

export function composeChoiceForm(data: Choice, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const options = data.options || [];
    const tips = data.tips || [];
    const keywords = data.keywords || [];
    const frames = data.frames || [];

    const template = `
    <Form>
        ${baseTemplate}

        ${imageTemplate}

        ${displayNameTemplate}

        <Dropdown name='chances' label='Chances' options='{expression_options}'>
            {data.chances}
        </Dropdown>

        <Dropdown name='time' label='Time limit' options='{expression_options}'>
            {data.time}
        </Dropdown>

        <Dropdown name='options_filter' label='Options filter' options='{expression_options}'>
            {data.options_filter}
        </Dropdown>

        ${keywordsTemplate}

        <Group name='options' label='Options' children='{options}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' required='{true}' label='Option name'>{@item.name}</TextInput>

                <TextInput name='description' label='Description'>{@item.description}</TextInput>
        
                <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{data.image}</Dropdown>

                <Dropdown name='effect' label='Effect' options='{expression_options}'>{@item.effect}</Dropdown>

                <ButtonGroup name='keywords' label='Keywords' options='{keyword_options}' multiple='{true}'>
                    {@item.keywords}
                </ButtonGroup>
                
            </Form>
        </Group>

        <Group name='tips' label='Tips' children='{tips}' item='@tip' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@tip.id}</NumberInput>

                <TextInput name='description' label='Description'>{@tip.description}</TextInput>

                <Dropdown name='image' label='Image' options='{image_options}'>{@tip.image}</Dropdown>

                <ButtonGroup name='keywords' label='Keywords' options='{keyword_options}' multiple='{true}'>
                    {@tip.keywords}
                </ButtonGroup>
                
            </Form>
        </Group>

        ${framesTemplate}

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, options, keywords, tips, frames,
        },
    }, true);

    return result as BaseControl[];
}