import { FormDefinition, BaseControl, parse } from "@app/dynamic-forms";
import { Version } from "@app/game-mechanics";

import { baseTemplate } from "../helpers";

export const composeVersionForm: FormDefinition = (data: Version): BaseControl[] => {
  data = data || {} as Version;

  const template = `
    <Form>
      <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
      <TextInput name='description' label='Description'>{data.description}</TextInput>
    </Form>
    `;

  const result = parse({
    source: template,
    context: { data }
  }, true) as BaseControl[];

  return result;
};