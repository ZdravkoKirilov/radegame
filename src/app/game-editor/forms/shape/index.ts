import { Shape, SHAPE_TYPES } from '@app/game-mechanics';
import { BaseControl, FormDefinition, parse } from '@app/dynamic-forms';

import {
  composeCommonFormContext, composeFromObject, styleTemplate, composeInlineStyleFormContext, baseTemplate
} from '../helpers';

export const composeShapeForm: FormDefinition<Shape> = (data, ent) => {

  const points = data.points || [];

  const template = `
    <Form>

        ${baseTemplate}

        <Dropdown name='type' label='Type' required='true' options='{types}'>
            {data.type}
        </Dropdown>

        ${styleTemplate}

        <Group name='points' label='Points' children='{points}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='x' required='{true}' label='X coord'>{@item.x}</TextInput>

                <TextInput name='y' required='{true}' label='Y coord'>{@item.y}</TextInput>

            </Form>
        </Group>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      data: data || {}, types: composeFromObject(SHAPE_TYPES), points
    },
  }, true);

  return result as BaseControl[];
}