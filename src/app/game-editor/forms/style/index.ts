import { Style, ENTITY_SHAPE, GameEntity } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext, composeFromObject } from '../helpers';

export function composeStyleForm(data: Style, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>

        ${baseTemplate}

        <TextInput name='width' label='Width'>{data.width}</TextInput>
        <TextInput name='height' label='Height'>{data.height}</TextInput>
        <TextInput name='radius' label='Radius'>{data.radius}</TextInput>
        <TextInput name='fill' label='Fill'>{data.fill}</TextInput>
        <ColorPicker name='strokeColor' label='Stroke color'>{data.strokeColor}</ColorPicker>
        <TextInput name='strokeThickness' label='Stroke thickness'>{data.strokeThickness}</TextInput>

        <NumberInput name='frame' label='Frame' defaultValue='{0}'>{data.frame}</NumberInput>
        <NumberInput name='rotation' label='Rotate' defaultValue='{0}'>{data.rotation}</NumberInput>

        <Dropdown name='shape' label='Shape' defaultValue='rectangle' options='{shapes}' required='true'>
            {data.shape}
        </Dropdown>

        <TextInput name='points' label='Points'>{data.points}</TextInput>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            shapes: composeFromObject(ENTITY_SHAPE),
            data,
        }
    }, true) as BaseControl[];

    return result;
}