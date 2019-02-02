import memoizeWith from 'ramda/src/memoizeWith';
import { GameConfig } from '../models';
import { Faction } from '../entities';

export const getAllTeams: (conf: GameConfig) => Faction[] = memoizeWith((conf: GameConfig) => {
    return Object.values(conf.factions);
});