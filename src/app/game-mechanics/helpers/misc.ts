import clone from 'immer';
import isArray from 'lodash/isArray';
import get from 'lodash/get';

import { Dictionary, Omit } from '@app/shared';

import { GameEntity, WithRuntimeStyle, Style, GameTemplate } from '../entities';

export const enrichEntity = <T, P>(
  config: GameTemplate,
  parseConfig: ParseConfig<T>,
  source: T,
): P => {
  return clone<P>(source as any, (draft: any) => {
    for (let key in parseConfig) {
      const parser = parseConfig[key] as any;
      const currentPropertyValue = draft[key];


      if (typeof parser === 'string') {
        draft[key] = get(config, [parser, source[key] as any], null);
      }
      if (typeof parser === 'function') {
        if (isArray(currentPropertyValue)) {
          draft[key] = currentPropertyValue.map(elem => {
            return parser(elem);
          }) as any;
        } else {
          draft[key] = parser(currentPropertyValue);
        }
      }
    }
  });
};

const findEntitiesBy = <T = GameEntity>(source: any, key: string, predicate: any) => {
  const entityList: any[] = Object.values(source[key]).filter((elem: any) => {
    return Object.keys(predicate).every(key => elem[key] === predicate[key]);
  });
  return entityList as T[];
};

export const findFirstEntityBy = <T = GameEntity>(source: GameTemplate, key: string, predicate: { [key in keyof T]: any }) => {
  const asList = findEntitiesBy<T>(source, key, predicate)
  return asList[0];
};

export const parseFromString = <T = any>(context: Dictionary) => (src: string): T => {
  try {
    const result = (new Function("with(this) {" + src + "}")).call(context);
    return result !== undefined ? result : '';
  } catch (err) {
    return '' as any;
  }
};

export const parseAndBind = <T = Function>(context: Dictionary) => (src: string): T => {
  const func = parseFromString(context)(src) as Function;
  return typeof func === 'function' ? func.bind(context) : func;
};

type ParseConfig<T> = Partial<{
  [K in keyof T]: string | ((item: any) => any);
}>;

export const combineStyles = (...args: Array<WithRuntimeStyle | Omit<Style, 'id'>>): Style => {
  return args.reduce((total, item) => {

    if (isEntityWithRuntimeStyle(item)) {
      const style = (typeof item.style === 'function' ? item.style(item) : item.style_inline) || {} as Style;
      return {
        ...total,
        ...style,
      } as any;
    }

    return {
      ...total,
      ...item,
    } as Style;

  }, {} as any);
};

const isEntityWithRuntimeStyle = (item: any): item is WithRuntimeStyle => {
  return 'style' in item && 'style_inline' in item;
};

/* const computePolygon = (sprite, text): Points => {
  const padding = 0;
  const x1 = sprite.styles.x;
  const y1 = sprite.styles.y - text.textStyle.fontSize;
  const x2 = sprite.styles.x + sprite.styles.width;
  const y2 = sprite.styles.y + sprite.styles.height;
  const polygon = [
    [x1 - padding, y1 - padding],
    [x2 + padding, y1 - padding],
    [x2 + padding, y2 + padding],
    [x1 - padding, y2 + padding],
    [x1 - padding, y1 - padding],
  ];

  return polygon as Points;
}; */