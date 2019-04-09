import memoizeWith from 'ramda/src/memoizeWith';
import { GameConfig } from '../models';
import { Team as Setup } from '../entities';

export const getAllTeams: (conf: GameConfig) => Setup[] = memoizeWith((conf: any) => {
    return Object.values(conf.setups);
});