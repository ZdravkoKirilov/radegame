import { chunk } from 'lodash';
import { Points } from '../models';

export const composePoints = (source: string): Points => {
    if (source) {
        const result = chunk(source.split(',').map(coord => Number(coord)), 2);
        return result;
    }
    return [[]];
};