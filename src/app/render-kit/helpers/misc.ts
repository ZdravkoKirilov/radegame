import { chunk, values } from 'lodash';
import { Points, Component, RenderFunction, CompositeComponent } from '../models';
import { PRIMS } from '../primitives';
import { AbstractFactory } from '../interfaces';
import { StatefulComponent, BasicComponent } from '../bases';

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

export const isComposite = (component: Component): component is CompositeComponent => {
    return typeof component.type !== 'string';
};

export const isFunctional = (component: Component): component is RenderFunction => isComposite(component) && !(component instanceof StatefulComponent);

export const isPrimitive = (component: Component): component is BasicComponent => !isComposite(component);