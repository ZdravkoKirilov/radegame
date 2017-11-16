import {Object} from '@types/fabric';

export abstract class FabricObject extends Object {
    data?: FabricObjectData;
}

export interface FabricObjectData {
    field?: number;
    game?: number;
    id?: number;
    from?: number;
    to?: number;
    paths?: Set<number>;
}
