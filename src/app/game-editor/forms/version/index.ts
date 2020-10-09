import { FormDefinition, BaseControl, parse } from "@app/dynamic-forms";
import { Version } from "@app/game-mechanics";

import { baseTemplate, composeCommonFormContext } from "../helpers";

export const composeVersionForm: FormDefinition<Version> = (data, ent) => {

  const template = `
    <Form>

      ${baseTemplate}

      <Dropdown name='menu' label='Menu' options='{module_options}'>{data.menu}</Dropdown>

    </Form>
    `;

  const result = parse({
    source: template,
    context: { data: data || {}, ...composeCommonFormContext(ent) }
  }, true) as BaseControl[];

  return result;
};