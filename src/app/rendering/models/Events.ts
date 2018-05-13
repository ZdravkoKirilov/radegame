export type BaseObjectChangeEvent = {
    type: EventType;
    payload?: any;
};

export const EVENT_TYPES = {
    'MOVED': 'MOVED',
    'SELECTED': 'SELECTED',
    'CLICKED': 'CLICKED',
    'HOVERED_IN': 'HOVERED_IN',
    'HOVERED_OUT': 'HOVERED_OUT'
};

export type EventType = typeof EVENT_TYPES.MOVED | typeof EVENT_TYPES.SELECTED |
    typeof EVENT_TYPES.CLICKED | typeof EVENT_TYPES.HOVERED_IN | typeof EVENT_TYPES.HOVERED_OUT;