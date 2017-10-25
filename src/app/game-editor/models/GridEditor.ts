import { FieldCoord } from './FieldCoord';

export enum eventTypes {
    'CREATE',
    'REMOVE'
}

export interface GridEditorChangeEvent {
    type: eventTypes;
    data: FieldCoord;
}
