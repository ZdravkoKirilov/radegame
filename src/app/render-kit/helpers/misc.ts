import { chunk, values } from 'lodash';
import { Points, Component, RenderFunction, CompositeComponent } from '../models';
import { PRIMS } from '../primitives';
import { AbstractFactory } from '../interfaces';
import { StatefulComponent, BasicComponent, MemoRenderFunction } from '../bases';

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

export const isComposite = (component: Component): component is CompositeComponent => isStateful(component) || isFunctional(component);

export const isFunctional = (component: Component): component is RenderFunction => typeof component === typeof Function && !('stateful' in component);

export const isPrimitive = (component: Component): component is BasicComponent => component instanceof BasicComponent;

export const isStateful = (component: Component): component is StatefulComponent => {
    return component instanceof StatefulComponent;
}

export const isMemo = (component: Component): component is MemoRenderFunction => {
    return isFunctional(component) && 'memo' in component;
}