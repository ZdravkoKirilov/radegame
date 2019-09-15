import { deepProp } from './dot-prop';
import { GameTemplate, ImageAsset, GameEntity, Sound } from '@app/game-mechanics';
import { environment } from 'environments/environment';

const { BASE_URL } = environment;

interface ObjectWithId {
    id?: number;
    [key: string]: any;
}

export const toDictionary = <T = ObjectWithId>(source: T[], indexProp = 'id'): Dictionary<T> => {
    return source.reduce((acc: Dictionary<T>, elem: T, index) => {
        const prop = deepProp.get(elem as any, indexProp, index);
        acc[prop] = elem;
        return acc;
    }, {});
};

export const rebaseListIndex = (source: ObjectWithId, newIndex: string): Dictionary<any> => {
    return Object.values(source).reduce((acc, item, index) => {
        const prop = deepProp.get(item, newIndex, index);
        acc[prop] = item;
        return acc;
    }, {});
}

export const asArray = <T>(obj: object): T[] => Object.values(obj);

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type WithKeys<T> = {
    readonly [P in keyof T]: P;
};

export type Dictionary<T = any> = {
    [key: string]: T;
}

export const genericTrackByFn = <T>(prop: keyof T) => (index: number, item: T) => {
    return item[prop];
};

export const extractLobbyPlayerName = (compositeName: string) => {
    return compositeName.split(':')[2];
};

export type WithKeysAs<T, P> = {
    [K in keyof T]: P;
};

export const formatGameConfigData = (data: GameTemplate): GameTemplate => {
    return Object.keys(data).reduce((acc, key) => {
        if (key === 'images') {
            const images: ImageAsset[] = data[key] as any;
            images.forEach(img => {
                img.thumbnail = BASE_URL + img.thumbnail
                img.image = BASE_URL + img.image
            });
        }
        if (key === 'sounds') {
            const sounds: Sound[] = data[key] as any;
            sounds.forEach(sound => {
                sound.file = BASE_URL + sound.file;
            });
        }
        acc[key] = toDictionary<GameEntity>(data[key]);
        return acc;
    }, {}) as GameTemplate;
};