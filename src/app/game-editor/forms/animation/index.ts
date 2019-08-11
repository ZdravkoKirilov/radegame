import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Animation, GameEntity } from '@app/game-mechanics';
import { composeCommonFormContext } from '../helpers';

export const composeAnimationForm: FormDefinition = (data: Animation, ent?: ConnectedEntities) => {
    data = data || {};

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <Dropdown name='from_style' label='Starting style' options='{style_options}' showImage='{true}'>{data.from_style}</Dropdown>

        <Dropdown name='to_style' label='Target style' options='{style_options}' showImage='{true}'>{data.to_style}</Dropdown>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
};

