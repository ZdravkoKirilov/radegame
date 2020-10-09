import {
  BaseControl,
  FormDefinition, parse
} from '@app/dynamic-forms';
import { Sonata, SonataStep, SONATA_PLAY_TYPE } from '@app/game-mechanics';

import { composeCommonFormContext, composeFromObject, baseTemplate } from '../helpers';

export const composeSonataForm: FormDefinition<Sonata> = (data, ent) => {

  const template = `
    <Form>
        ${baseTemplate}

        <Dropdown name='type' label='Type' options='{types}' defaultValue='{types[0].value}'>{data.type}</Dropdown>

        <ButtonGroup name='loop' label='Loop' options='{boolean_options}' defaultValue='{false}'>
            {data.loop}
        </ButtonGroup>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data: data || {},
      types: composeFromObject(SONATA_PLAY_TYPE),
    }
  }, true) as BaseControl[];

  return result;
};

export const composeSonataStepForm: FormDefinition<SonataStep> = (data, ent) => {

  const template = `
    <Form>
       
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' label='Name'>{data.name}</TextInput>

        <Dropdown name='sound' label='Sound' options='{sound_options}'>
            {data.sound}
        </Dropdown>

        <ButtonGroup name='loop' label='Loop' options='{boolean_options}' defaultValue='{false}'>
            {data.loop}
        </ButtonGroup>

        <NumberInput name='rate' label='Rate'>{data.rate}</NumberInput>

        <NumberInput name='volume' label='Volume'>{data.volume}</NumberInput>

        <NumberInput name='fade_from' label='Fade from'>{data.fade_from}</NumberInput>

        <NumberInput name='fade_to' label='Fade to'>{data.fade_to}</NumberInput>

        <NumberInput name='fade_duration' label='Fade duration'>{data.fade_duration}</NumberInput>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data: data || {}
    }
  }, true) as BaseControl[];

  return result;
};

