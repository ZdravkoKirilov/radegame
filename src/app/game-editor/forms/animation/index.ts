import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Animation, ANIMATION_PLAY_TYPE } from '@app/game-mechanics';
import { composeCommonFormContext, composeFromObject, composeInlineStyleFormContext, baseTemplate } from '../helpers';
import { ANIMATION_EASINGS } from '@app/render-kit';

export const composeAnimationForm: FormDefinition = (data: Animation, ent?: ConnectedEntities) => {
    data = data || {};
    const steps = data.steps || [];

    const template = `
    <Form>
        ${baseTemplate}

        <Dropdown name='type' label='Type' options='{types}' defaultValue='{types[0].value}'>{data.type}</Dropdown>

        <NumberInput name='repeat' label='Repeat times' defaultValue='{0}'>{data.repeat}</NumberInput>

        <ButtonGroup name='bidirectional' label='Bidirectional' options='{boolean_options}' defaultValue='{false}'>
            {data.bidirectional}
        </ButtonGroup>

        <NumberInput name='delay' label='Delay'>{data.delay}</NumberInput>

        <Group name='steps' label='Steps' children='{steps}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <EmbeddedData 
                    name='from_style_inline' 
                    label='Inline from style' 
                    childrenDefinition='{composeStyleForm}'
                    connectedEntities='{entities}' 
                >
                    {@item.from_style_inline}
                </EmbeddedData>

                <EmbeddedData 
                    name='to_style_inline' 
                    label='Inline to style' 
                    childrenDefinition='{composeStyleForm}'
                    connectedEntities='{entities}' 
                >
                    {@item.to_style_inline}
                </EmbeddedData>

                <CodeEditor name='from_value' label='From value'>
                    {@item.from_value}
                </CodeEditor>

                <CodeEditor name='to_value' label='To value'>
                    {@item.to_value}
                </CodeEditor>

                <NumberInput name='duration' label='Duration'>{@item.duration}</NumberInput>

                <NumberInput name='delay' label='Delay'>{@item.delay}</NumberInput>

                <Dropdown name='easing' label='Easing' options='{easings}' defaultValue='{easings[0].value}'>
                    {@item.easing}
                </Dropdown>

                <NumberInput name='repeat' label='Repeat times' defaultValue='{0}'>{@item.repeat}</NumberInput>

                <ButtonGroup name='bidirectional' label='Bidirectional' options='{boolean_options}' defaultValue='{false}'>
                    {@item.bidirectional}
                </ButtonGroup>

                <CodeEditor name='output_transformer' label='Output transformer'>
                    {@item.output_transformer}
                </CodeEditor>

            </Form>
        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            ...composeInlineStyleFormContext(ent),
            data, steps,
            types: composeFromObject(ANIMATION_PLAY_TYPE),
            easings: composeFromObject(ANIMATION_EASINGS, true),
        }
    }, true) as BaseControl[];

    return result;
};

