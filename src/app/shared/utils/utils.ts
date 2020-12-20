import keyBy from 'lodash/keyBy';

interface ObjectWithId {
  id?: number;
  [key: string]: any;
}

export const toDictionary = <T = ObjectWithId>(source: T[], indexProp = 'id'): Dictionary<T> => keyBy(source, indexProp);

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type WithKeys<T> = {
  readonly [P in keyof T]: P;
};

export type Dictionary<T = any> = {
  [key: string]: T;
}

export const genericTrackByFn = <T>(prop: keyof T) => (_index: number, item: T) => {
  return item[prop];
};

export type WithKeysAs<T, P = any> = {
  [K in keyof T]: P;
};

export const safeJSON = <T = {}>(source: any, fallback?: unknown): T => {
  if (typeof source === 'string') {
    try {
      return JSON.parse(source);
    } catch {
      return fallback as T;
    }
  } else {
    return source;
  }
};

export const arrayToMap = <Key, Value>(items: Value[], key: keyof Value) => {
  return items.reduce((acc, item) => {
    acc.set(item[key] as any, item);
    return acc;
  }, new Map<Key, Value>())
}