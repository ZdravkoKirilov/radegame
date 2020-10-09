import { Widget } from '@app/game-mechanics';
import { BaseControl, parse, FormDefinition } from '@app/dynamic-forms';

import {
  baseTemplate, composeCommonFormContext, styleTemplate,
  composeInlineStyleFormContext
} from '../helpers';

export const composeWidgetForm: FormDefinition<Widget> = (data, ent) => {

  const template = `
    <Form>
        ${baseTemplate}

        ${styleTemplate}

        <Dropdown name='background' label='Background' options='{image_options}'>{data.background}</Dropdown>

        <CodeEditor name="get_nodes" label="Create nodes">
            {data.get_nodes}
        </CodeEditor>

        <CodeEditor name="render" label="Render">
          {data.render}
        </CodeEditor>

        <CodeEditor name="dynamic_background" label="Dynamic background">
          {data.dynamic_background}
        </CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      data, frames,
    },
  }, true);

  return result as BaseControl[];
}
