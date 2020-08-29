import keyBy from 'lodash/keyBy';

import { GameTemplate, GameEntity } from '@app/game-mechanics';
import { environment } from 'environments/environment';


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

export const genericTrackByFn = <T>(prop: keyof T) => (index: number, item: T) => {
    return item[prop];
};

export type WithKeysAs<T, P = any> = {
    [K in keyof T]: P;
};

export const formatGameConfigData = (data: GameTemplate): GameTemplate => {
    return Object.keys(data).reduce((acc, key) => {
        acc[key] = toDictionary<GameEntity>(data[key]);
        return acc;
    }, {}) as GameTemplate;
};

export const safeJSON = <T = any>(source: any, fallback = null): T => {
    if (typeof source === 'string') {
        try {
            return JSON.parse(source);
        } catch {
            return null;
        }
    } else {
        return source;
    }
};