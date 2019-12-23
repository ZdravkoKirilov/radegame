import { Sound } from "./Sound.model";
import { BaseModel } from "./Base.model";

export type Sonata = BaseModel & Partial<{
    type: SonataPlayType;
    steps: SonataStep[];

    loop: boolean;
}>;

export type SonataStep = Partial<{
    id: number;
    owner: number;

    sound: number | Sound;

    volume: number;
    loop: boolean;
    rate: number;

    fade_from: number;
    fade_to: number;
    fade_duration: number;
}>

export const SONATA_PLAY_TYPE = {
    SEQUENCE: 'SEQUENCE',
    PARALLEL: 'PARALLEL',
} as const;

export type SonataPlayType = keyof typeof SONATA_PLAY_TYPE;