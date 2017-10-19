import { ResourceList } from './Resource';

export interface Player {
    id?: number|string;
    alias?: string;
    resources?: ResourceList;
}
