import { get } from 'lodash';

import { Option, ConnectedEntities } from '@app/dynamic-forms';
import { Dictionary, toDictionary } from '@app/shared';
import { ImageAsset, GameEntity } from '@app/game-mechanics';

import { composeStyleForm } from './style';

export function composeEntityOptions<T = GameEntity>(
  items: T[],
  images: Dictionary<ImageAsset>,
  key: keyof ConnectedEntities,
  imageProp = ['image'],
  withEmptyOption = true,
): Option[] {
  items = items || [];
  const result: Option[] = items.map((elem: any) => {
    let image: any;
    if (key === 'images') {
      image = elem[imageProp[0]] || elem[imageProp[1]];
    } else {
      const img = images[elem['image']] as any;
      if (img) {
        image = img[imageProp[0]] || img[imageProp[1]];
      }
    }

    return {
      label: elem['name'],
      value: elem['id'],
      image
    };
  });
  if (withEmptyOption) {
    result.unshift({
      label: 'None',
      value: null,
    });
  }
  return result;
}

export function composeBooleanOptions(positive = 'Yes', negative = 'No'): Option[] {
  return [{
    label: positive,
    value: true
  }, {
    label: negative,
    value: false
  }];
}

export function composeFromObject(obj: object, useKeyOnly = false): Option[] {
  return Object.keys(obj).map(key => ({ value: key, label: useKeyOnly ? key : get(obj, key) }));
};

export const baseTemplate = `
    <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
    <TextInput name='description' label='Description'>{data.description}</TextInput>
`;

export const inlineStyleTemplate = `
    <EmbeddedData 
        name='style_inline' 
        label='Inline style'
        connectedEntities='{entities}' 
        childrenDefinition='{composeStyleForm}' 
    >
        {data.style_inline}
    </EmbeddedData>
`;

export const styleTemplate = `
    <CodeEditor name="style" label="Style">
        {data.style}
    </CodeEditor>

    ${inlineStyleTemplate}
`;

export const composeInlineStyleFormContext = (ent: ConnectedEntities) => {
  return { composeStyleForm: composeStyleForm(true), entities: ent };
}

export const composeCommonFormContext = (ent: any) => {
  ent = ent || {} as any;
  const images = toDictionary<ImageAsset>(ent.images);

  return {
    setup_options: composeEntityOptions(ent.setups, images, 'setups'),
    token_options: composeEntityOptions(ent.tokens, images, 'tokens'),
    widget_options: composeEntityOptions(ent.widgets, images, 'widgets'),
    image_options: composeEntityOptions(ent.images, images, 'images', ['thumbnail', 'svg']),
    style_options: composeEntityOptions(ent.styles, images, 'styles'),
    sound_options: composeEntityOptions(ent.sounds, images, 'sounds'),
    expression_options: composeEntityOptions(ent.expressions, images, 'expressions'),
    animation_options: composeEntityOptions(ent.animations, images, 'animations'),
    module_options: composeEntityOptions(ent.modules, images, 'modules'),
    language_options: composeEntityOptions(ent.languages, images, 'languages'),
    text_options: composeEntityOptions(ent.texts, images, 'texts'),
    shape_options: composeEntityOptions(ent.shapes, images, 'shapes'),

    boolean_options: composeBooleanOptions(),
  }
};