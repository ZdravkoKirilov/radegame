import { Object } from '@types/fabric';

export abstract class FabricObject extends Object {
    field?: number;
    game?: number;
    id?: number;
}
