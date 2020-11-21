import * as Color from 'color';

import {
  AbstractFactory, StatefulComponent, BasicComponent, MemoRenderFunction, Component, RenderFunction, CompositeComponent, RzElement, MetaProps
} from '../internal';

export const getRealType = (factory: AbstractFactory, type: string) => {
  const realType = factory.customResolvers!.reduce(
    (acc: any, resolver) => {
      if (type in resolver) {
        return resolver[type] as any;
      }
      return acc;
    },
    null
  );
  return realType as any;
}

export const isComposite = (component: Component): component is CompositeComponent => isStateful(component) || isFunctional(component);

export const isFunctional = (component: Component): component is RenderFunction => typeof component === typeof Function && !('stateful' in component);

export const isPrimitive = (component: Component): component is BasicComponent => component instanceof BasicComponent;

export const isStateful = (component: Component): component is StatefulComponent => {
  return component instanceof StatefulComponent;
}

export const isMemo = (component: Component): component is MemoRenderFunction => {
  return isFunctional(component) && 'memo' in component.type!;
}

export const flatRender = (source: any): RzElement => {
  let result = source;
  while (Array.isArray(result) && result.length > 0) {
    result = result[0];
  }

  return result;
}

export const cloneRenderFunction = (originalType: RenderFunction | any, meta: MetaProps): RenderFunction => {
  const component = originalType.bind({
    ...originalType,
    meta
  }) as RenderFunction | any;
  for (let key in originalType) {
    component[key] = originalType[key];
  }
  component.meta = meta;
  return component;
};

export const toNumericColor = (value: string | number) => {
  const color = Color(value);
  const asArray = color.rgb().array();
  return asArray;
};

export const toHexColor = (value: string | number | string[] | number[]) => {
  if (typeof value === 'string') {
    if (value.startsWith('#')) {
      const result = value.replace('#', '0x');
      return Number(result);
    }
    // throw new Error('Unrecognized value: ' + value);
  }

  const color = Array.isArray(value) ? Color.rgb(value) : Color(value);
  const result = color.hex().replace('#', '0x');
  return Number(result);
};

export const toHexColorString = (value: string | number | string[] | number[]) => {
  if (typeof value === 'string') {
    if (value.startsWith('#')) {
      const result = value.replace('#', '0x');
      return result;
    }
  }

  const color = Array.isArray(value) ? Color.rgb(value) : Color(value);
  const result = color.hex();
  return result;
};

export const calculateScaling = (target: [number, number], original: [number, number]) => {
  return `${target[0] / original[0]} ${target[1] / original[1]}`
    .split(' ')
    .map(elem => isNaN(Number(elem)) ? 1 : elem)
    .join(' ');
};

