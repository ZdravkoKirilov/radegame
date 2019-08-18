import { EntityState } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext, displayNameTemplate, imageTemplate } from '../helpers';

export function composeStateForm(data: EntityState, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>
        ${baseTemplate}

        ${imageTemplate}

        ${displayNameTemplate}

        <Dropdown name='style' label='Style' options='{style_options}'>{data.style}</Dropdown>

        <Dropdown name='sound' label='Sound' options='{sound_options}'>{data.sound}</Dropdown>

        <Dropdown name='animation' label='Animation' options='{animation_options}'>{data.animation}</Dropdown>

        <NumberInput name='frame' label='Frame'>{data.frame}</NumberInput>
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
}