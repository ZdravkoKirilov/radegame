import { Expression } from '@app/game-mechanics';
import { BaseControl, FormDefinition, parse } from '@app/dynamic-forms';

import { composeCommonFormContext, baseTemplate } from '../helpers';

export const composeExpressionForm: FormDefinition<Expression> = (data, ent) => {

  const template = `
    <Form>
        ${baseTemplate}

        <CodeEditor name='code' label='Code'>{data.code}</CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data: data || {},
    }
  }, true) as BaseControl[];

  return result;
}