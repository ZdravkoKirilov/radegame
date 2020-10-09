import { FormDefinition, BaseControl, parse } from "@app/dynamic-forms";
import { Token, TokenNode } from "@app/game-mechanics";

import { baseTemplate, composeCommonFormContext, composeInlineStyleFormContext, styleTemplate } from "../helpers";

export const composeTokenForm: FormDefinition<Token> = (data, ent) => {

  const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        ${baseTemplate}

        <Dropdown name='template' label='Template' options='{widget_options}'>
          {data.template}
        </Dropdown>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>
    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      data: data || {},
    }
  }, true) as BaseControl[];

  return result;
};

export const composeTokenNodeForm: FormDefinition<TokenNode> = (data, ent) => {
  const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        ${baseTemplate}

        ${styleTemplate}

        <Dropdown name='text' label='Text' options='{text_options}'>
          {data.text}
        </Dropdown>

        <Dropdown name='image' label='Image' options='{image_options}'>
          {data.image}
        </Dropdown>

        <Dropdown name='widget' label='Widget' options='{widget_options}'>
          {data.widget}
        </Dropdown>

        <Dropdown name='shape' label='Shape' options='{shape_options}'>
          {data.shape}
        </Dropdown>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      data: data || {},
    }
  }, true) as BaseControl[];

  return result;
};