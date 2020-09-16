import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Sonata, SONATA_PLAY_TYPE } from '@app/game-mechanics';
import { composeCommonFormContext, composeFromObject, baseTemplate } from '../helpers';

export const composeSonataForm: FormDefinition = (data: Sonata, ent?: ConnectedEntities) => {
    data = data || {};
    const steps = data.steps || [];

    const template = `
    <Form>
        ${baseTemplate}

        <Dropdown name='type' label='Type' options='{types}' defaultValue='{types[0].value}'>{data.type}</Dropdown>

        <ButtonGroup name='loop' label='Loop' options='{boolean_options}' defaultValue='{false}'>
            {data.loop}
        </ButtonGroup>

        <Group name='steps' label='Steps' children='{steps}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='sound' label='Sound' options='{sound_options}'>
                    {@item.sound}
                </Dropdown>

                <ButtonGroup name='loop' label='Loop' options='{boolean_options}' defaultValue='{false}'>
                    {@item.loop}
                </ButtonGroup>

                <NumberInput name='rate' label='Rate'>{@item.rate}</NumberInput>

                <NumberInput name='volume' label='Volume'>{@item.volume}</NumberInput>

                <NumberInput name='fade_from' label='Fade from'>{@item.fade_from}</NumberInput>

                <NumberInput name='fade_to' label='Fade to'>{@item.fade_to}</NumberInput>

                <NumberInput name='fade_duration' label='Fade duration'>{@item.fade_duration}</NumberInput>

            </Form>
        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent),
            data, steps,
            types: composeFromObject(SONATA_PLAY_TYPE),
        }
    }, true) as BaseControl[];

    return result;
};

