import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Animation, ANIMATION_PLAY_TYPE } from '@app/game-mechanics';
import { composeCommonFormContext, composeFromObject } from '../helpers';
import { ANIMATION_EASINGS } from '@app/render-kit';

export const composeAnimationForm: FormDefinition = (data: Animation, ent?: ConnectedEntities) => {
    data = data || {};
    const steps = data.steps || [];

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <Dropdown name='type' label='Type' options='{types}' defaultValue='{types[0].value}'>{data.type}</Dropdown>

        <NumberInput name='repeat' label='Repeat times' defaultValue='{0}'>{data.repeat}</NumberInput>

        <ButtonGroup name='bidirectional' label='Bidirectional' options='{boolean_options}' defaultValue='{false}'>
            {data.bidirectional}
        </ButtonGroup>

        <NumberInput name='delay' label='Delay'>{data.delay}</NumberInput>

        <Group name='steps' label='Steps' children='{steps}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='from_style' label='Starting style' options='{style_options}' showImage='{true}'>
                    {@item.from_style}
                </Dropdown>

                <Dropdown name='to_style' label='Target style' options='{style_options}' showImage='{true}'>
                    {@item.to_style}
                </Dropdown>

                <NumberInput name='duration' label='Duration'>{@item.duration}</NumberInput>

                <NumberInput name='delay' label='Delay'>{@item.delay}</NumberInput>

                <Dropdown name='easing' label='Easing' options='{easings}' defaultValue='{easings[0].value}'>
                    {@item.easing}
                </Dropdown>

                <NumberInput name='repeat' label='Repeat times' defaultValue='{0}'>{@item.repeat}</NumberInput>

                <ButtonGroup name='bidirectional' label='Bidirectional' options='{boolean_options}' defaultValue='{false}'>
                    {@item.bidirectional}
                </ButtonGroup>

            </Form>
        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, steps,
            types: composeFromObject(ANIMATION_PLAY_TYPE),
            easings: composeFromObject(ANIMATION_EASINGS, true),
        }
    }, true) as BaseControl[];

    return result;
};

