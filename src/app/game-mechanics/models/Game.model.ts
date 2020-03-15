import { GameEntityList, ALL_ENTITIES, WithImage, Round } from '../entities';
import { WithKeysAs, Omit } from '@app/shared';

import { WithBoard } from '../entities';

export type Game = WithBoard & Partial<{
    id: number;

    title: string;
    description: string;
    image: string;

    core_data: string;

    languages: GameLanguage[];
    menu: number;
}>

export type GameLanguage = WithImage & Partial<{
    id: number;
    owner: number; // Game
    name: string;
    display_name: string;
}>

export type GameTemplate = Omit<WithKeysAs<typeof ALL_ENTITIES, GameEntityList>, 'games'>;

export type GameConfig = GameTemplate;