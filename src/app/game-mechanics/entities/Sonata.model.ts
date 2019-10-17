import { Sound } from "./Sound.model";

export type Sonata = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

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