import { Module } from '@app/game-mechanics';
import { BaseControl, FormDefinition, parse } from '@app/dynamic-forms';

import {
  baseTemplate, composeCommonFormContext
} from '../helpers';

export const composeModuleForm: FormDefinition<Module> = (data, ent) => {

  const template = `
    <Form>
        ${baseTemplate}
        
        <Dropdown name='board' label='Entry' options='{widget_options}' showImage='{true}'>{data.entry}</Dropdown>
        <Dropdown name='loader' label='Loader' options='{widget_options}' showImage='{true}'>{data.loader}</Dropdown>

        <ButtonGroup name='dependencies' label='Dependencies' options='{module_options}'>{data.dependencies}</ButtonGroup>

    </Form>
`;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data: data || {}
    },
  }, true);

  return result as BaseControl[];
}
