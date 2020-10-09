import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Sound } from "@app/game-mechanics";

import { composeCommonFormContext, baseTemplate } from "../helpers";

export const composeSoundForm: FormDefinition<Sound> = (data, ent) => {

  const template = `
    <Form>
      ${baseTemplate}
      <FilePicker name='file' label='Sound file' required='{true}'>{data.file}</FilePicker>
    </Form>
  `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data: data || {},
    },
  }, true);

  return result as BaseControl[];
};