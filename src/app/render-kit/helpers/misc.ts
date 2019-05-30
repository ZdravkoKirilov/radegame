import { chunk, values } from 'lodash';
import { Points, Component } from '../models';
import { PRIMS } from '../primitives';
import { AbstractFactory } from '../interfaces';

export const composePoints = (source: string): Points => {
    if (source) {
        const result = chunk(source.split(',').map(coord => Number(coord)), 2);
        return result;
    }
    return [[]];
};

export const hasPrimitiveType = (type: string) => new Set(values(PRIMS)).has(type);

export const getRealType = (factory: AbstractFactory, type: string) => {
    const realType = factory.customResolvers.reduce(
        (acc, resolver) => {
            if (type in resolver) {
                return resolver[type] as any;
            }
        },
        null
    );
    return realType as Component;
}