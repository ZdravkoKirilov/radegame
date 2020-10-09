import {
  BaseControl,
  FormDefinition, parse
} from '@app/dynamic-forms';
import { Animation, AnimationStep, ANIMATION_PLAY_TYPE } from '@app/game-mechanics';
import { ANIMATION_EASINGS } from '@app/render-kit';

import { composeCommonFormContext, composeFromObject, composeInlineStyleFormContext, baseTemplate } from '../helpers';

export const composeAnimationForm: FormDefinition<Animation> = (data, ent) => {

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
      data: data || {},
      types: composeFromObject(ANIMATION_PLAY_TYPE),
    }
  }, true) as BaseControl[];

  return result;
};

export const composeAnimationStepForm: FormDefinition<AnimationStep> = (data, ent) => {

  const template = `
    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <EmbeddedData 
            name='from_style' 
            label='From style' 
            childrenDefinition='{composeStyleForm}'
            connectedEntities='{entities}' 
        >
            {data.from_style}
        </EmbeddedData>

        <EmbeddedData 
            name='to_style' 
            label='To style' 
            childrenDefinition='{composeStyleForm}'
            connectedEntities='{entities}' 
        >
            {data.to_style}
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

        <CodeEditor name='transform_result' label='Output transformer'>
            {data.transform_result}
        </CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      data: data || {},
      easings: composeFromObject(ANIMATION_EASINGS, true),
    }
  }, true) as BaseControl[];

  return result;
};
