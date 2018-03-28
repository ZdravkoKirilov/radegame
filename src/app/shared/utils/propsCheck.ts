import { SimpleChanges } from '@angular/core';

export const propHasChanged = (c: SimpleChanges, prop: string): boolean => {
    return c[prop] && c[prop].currentValue !== c[prop].previousValue;
};

export const propHasNewValue = (c: SimpleChanges, prop: string): boolean => {
    return propHasChanged(c, prop) && propHasValue(c, prop);
};

export const propHasValue = (c: SimpleChanges, prop: string): boolean => {
    return c[prop] && (c[prop].currentValue || c[prop].currentValue === false);
};

export const getPropValue = (c: SimpleChanges, prop: string): any => {
    return c[prop].currentValue;
}