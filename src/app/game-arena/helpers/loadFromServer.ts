import keyBy from 'lodash/keyBy';

import { FetchGameConfig } from "@app/game-arena";

export const loadFromServer = ({ action_config }) => {
    const { payload } = action_config;
    const payloadDict = keyBy(payload, 'key');

    return [
        new FetchGameConfig({
            gameId: payloadDict.gameId.value,
            keywords: payloadDict.keywords.value.split(','),
        }),
    ];
};