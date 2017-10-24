export type GridEditorChangeEventType = 'BROWSE' | 'CREATE' | 'REMOVE';

export const eventTypes = {
    BROWSE: <GridEditorChangeEventType>'BROWSE',
    CREATE: <GridEditorChangeEventType>'CREATE',
    REMOVE: <GridEditorChangeEventType>'REMOVE'
};

export interface FieldCoord {
    x: number;
    y: number;
}

export interface GridEditorChangeEvent {
    type: GridEditorChangeEventType;
    data: FieldCoord;
}
