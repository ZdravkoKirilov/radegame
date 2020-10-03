import {
  BaseControl,
  FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Animation, AnimationStep, ANIMATION_PLAY_TYPE } from '@app/game-mechanics';
import { composeCommonFormContext, composeFromObject, composeInlineStyleFormContext, baseTemplate } from '../helpers';
import { ANIMATION_EASINGS } from '@app/render-kit';

export const composeAnimationForm: FormDefinition = (data: Animation, ent?: ConnectedEntities) => {
  data = data || {};

  const template = `
    <Form>
        ${baseTemplate}

        <Dropdown name='type' label='Type' options='{types}' defaultValue='{types[0].value}'>{data.type}</Dropdown>

        <NumberInput name='repeat' label='Repeat times' defaultValue='{0}'>{data.repeat}</NumberInput>

        <ButtonGroup name='bidirectional' label='Bidirectional' options='{boolean_options}' defaultValue='{false}'>
            {data.bidirectional}
        </ButtonGroup>

        <NumberInput name='delay' label='Delay'>{data.delay}</NumberInput>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data,
      types: composeFromObject(ANIMATION_PLAY_TYPE),
    }
  }, true) as BaseControl[];

  return result;
};

export const composeAnimationStepForm: FormDefinition = (data: AnimationStep, ent?: ConnectedEntities) => {
  data = data || {};

  const template = `
    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <EmbeddedData 
            name='from_style_inline' 
            label='Inline from style' 
            childrenDefinition='{composeStyleForm}'
            connectedEntities='{entities}' 
        >
            {data.from_style_inline}
        </EmbeddedData>

        <EmbeddedData 
            name='to_style_inline' 
            label='Inline to style' 
            childrenDefinition='{composeStyleForm}'
            connectedEntities='{entities}' 
        >
            {data.to_style_inline}
        </EmbeddedData>

        <CodeEditor name='from_value' label='From value'>
            {data.from_value}
        </CodeEditor>

        <CodeEditor name='to_value' label='To value'>
            {data.to_value}
        </CodeEditor>

        <NumberInput name='duration' label='Duration'>{data.duration}</NumberInput>

        <NumberInput name='delay' label='Delay'>{data.delay}</NumberInput>

        <Dropdown name='easing' label='Easing' options='{easings}' defaultValue='{easings[0].value}'>
            {data.easing}
        </Dropdown>

        <NumberInput name='repeat' label='Repeat times' defaultValue='{0}'>{data.repeat}</NumberInput>

        <ButtonGroup name='bidirectional' label='Bidirectional' options='{boolean_options}' defaultValue='{false}'>
            {data.bidirectional}
        </ButtonGroup>

        <CodeEditor name='output_transformer' label='Output transformer'>
            {data.output_transformer}
        </CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      data,
      easings: composeFromObject(ANIMATION_EASINGS, true),
    }
  }, true) as BaseControl[];

  return result;
};
