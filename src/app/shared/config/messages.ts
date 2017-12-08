import {
    DELETE_RESOURCE_FAIL,
    DELETE_RESOURCE_SUCCESS,
    SAVE_RESOURCE_FAIL,
    SAVE_RESOURCE_SUCCESS
} from '../../game-editor/state/reducers/byFeature/resources.reducer';
import {
    DELETE_FACTION_FAIL,
    DELETE_FACTION_SUCCESS,
    SAVE_FACTION_FAIL,
    SAVE_FACTION_SUCCESS
} from '../../game-editor/state/reducers/byFeature/factions.reducer';
import {
    DELETE_FIELD_FAIL,
    DELETE_FIELD_SUCCESS,
    SAVE_FIELD_FAIL,
    SAVE_FIELD_SUCCESS
} from '../../game-editor/state/reducers/byFeature/fields.reducer';
import {
    DELETE_MAP_PATH_FAIL,
    DELETE_MAP_PATH_SUCCESS,
    SAVE_MAP_LOCATION_FAIL,
    SAVE_MAP_LOCATION_SUCCESS,
    SAVE_MAP_PATH_FAIL,
    SAVE_MAP_PATH_SUCCESS
} from '../../game-editor/state/reducers/byFeature/map.reducer';

function savedSuccessfully(entity) {
    return `${entity} was saved successfully.`;
}

function couldNotBeSaved(entity) {
    return `${entity} could not be saved.`;
}

function removedSuccessfully(entity) {
    return `${entity} was removed successfully.`;
}

function couldNotBeRemoved(entity) {
    return `${entity} could not be removed.`;
}

interface SystemMessages {
    [key: string]: string;
}


export const systemMessages: SystemMessages = {
    [SAVE_FIELD_SUCCESS]: savedSuccessfully('Field'),
    [SAVE_FIELD_FAIL]: couldNotBeSaved('Field'),
    [DELETE_FIELD_SUCCESS]: removedSuccessfully('Field'),
    [DELETE_FIELD_FAIL]: couldNotBeRemoved('Field'),
    [SAVE_MAP_LOCATION_SUCCESS]: savedSuccessfully('Location'),
    [SAVE_MAP_LOCATION_FAIL]: couldNotBeSaved('Location'),
    [SAVE_MAP_PATH_SUCCESS]: savedSuccessfully('Path'),
    [SAVE_MAP_PATH_FAIL]: couldNotBeSaved('Path'),
    [DELETE_MAP_PATH_SUCCESS]: removedSuccessfully('Path'),
    [DELETE_MAP_PATH_FAIL]: couldNotBeRemoved('Path'),
    [SAVE_RESOURCE_SUCCESS]: savedSuccessfully('Resource'),
    [SAVE_RESOURCE_FAIL]: couldNotBeSaved('Resource'),
    [DELETE_RESOURCE_SUCCESS]: removedSuccessfully('Resource'),
    [DELETE_RESOURCE_FAIL]: couldNotBeRemoved('Resource'),
    [SAVE_FACTION_SUCCESS]: savedSuccessfully('Faction'),
    [SAVE_FACTION_FAIL]: couldNotBeSaved('Faction'),
    [DELETE_FACTION_SUCCESS]: removedSuccessfully('Faction'),
    [DELETE_FACTION_FAIL]: couldNotBeRemoved('Faction')
};
