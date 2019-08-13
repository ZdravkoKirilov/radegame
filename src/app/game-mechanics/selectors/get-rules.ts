import memoizeWith from 'ramda/src/memoizeWith';
import { GameConfig } from "../models";
import { CONDITION_MODES, Condition } from "../entities";
import { FormKey } from "@app/game-editor";

const getCond = (conf: GameConfig) => (total: Condition[], id: number) => {
    // const cond = conf.conditions[id];
    // if (cond.mode === CONDITION_MODES.RULE) {
    //     total.push(cond);
    // }
    // return total;
}

export const getGameRules = memoizeWith((conf: GameConfig) => {
    // return conf.game.settings.reduce(getCond(conf), []);
});

export const getEntityRules = memoizeWith((conf: GameConfig, entity: FormKey, ids: string[]) => {
    let result: Condition[] = [];

    ids.forEach(id => {
        result = [...result, ...conf[entity][id].settings.reduce(getCond(conf), [])];
    });
    return result;
});

export const getAllEntityRules = memoizeWith((conf: GameConfig, entity: FormKey) => {
    return getEntityRules(conf, entity, Object.keys(conf[entity]));
});