import memoizeWith from 'ramda/src/memoizeWith';
import { GameConfig } from '../models';
import { Team } from '../entities';

export const getAllTeams: (conf: GameConfig) => Team[] = memoizeWith((conf: GameConfig) => {
    return Object.values(conf.teams);
});