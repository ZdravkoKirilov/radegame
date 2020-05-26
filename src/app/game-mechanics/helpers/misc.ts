import clone from 'immer';
import isArray from 'lodash/isArray';
import get from 'lodash/get';

import { Points } from '@app/render-kit';
import { GameEntity, WithRuntimeStyle, Style, AllEntity, GameEntityUnion } from '../entities';
import { Dictionary } from '@app/shared';
import { GameTemplate } from '../models';

export const enrichEntity = <T = GameEntity, P = any>(
    config: Dictionary<GameEntity>,
    parseConfig: ParseConfig<T>,
    source: T,
): P => {
    return source ? clone<P>(source as any, (draft: any) => {
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

            // if (isArray(currentPropertyValue) || typeof currentPropertyValue !== 'object') {
            //     if (typeof parser === 'string') {
            //         draft[key] = get(config, [parser, source[key] as any], null);
            //     }
            //     if (typeof parser === 'function') {
            //         if (isArray(currentPropertyValue)) {
            //             draft[key] = currentPropertyValue.map(elem => {
            //                 return parser(elem);
            //             }) as any;
            //         } else {
            //             draft[key] = parser(currentPropertyValue);
            //         }
            //     }
            // }
        }
    }) : null;
};

const findEntitiesBy = <T = GameEntity>(source: GameTemplate, key: AllEntity, predicate: { [key in keyof GameEntityUnion]: any }) => {
    const entityList: unknown[] = Object.values(source[key]).filter(elem => {
        return Object.keys(predicate).every(key => elem[key] === predicate[key]);
    });
    return entityList as T[];
};

export const findFirstEntityBy = <T = GameEntity>(source: GameTemplate, key: AllEntity, predicate: { [key in keyof GameEntityUnion]: any }) => {
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

export const combineStyles = (...args: (Style | WithRuntimeStyle)[]): Style => {
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

    }, {} as Style);
};

const isEntityWithRuntimeStyle = (item: any): item is WithRuntimeStyle => {
    return 'style' in item && 'style_inline' in item;
};

const computePolygon = (sprite, text): Points => {
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
};