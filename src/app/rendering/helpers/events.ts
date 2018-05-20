import { BaseProps } from "../models";

export const assignEvents = (data: BaseProps, graphic: any) => {
    const events = Object.keys(data).reduce((total: any, key: string) => {
        if (key.startsWith('on') && typeof data[key] === 'function') {
            const handler = data[key];
            const eventName = key.slice(2).toLowerCase();
            graphic.on(eventName, event => {
                handler(event, data);
            });
        }
        return total;
    }, {});
};