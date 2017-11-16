import * as editor from '../../game-editor/state/actions/actionTypes';

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


export const systemMessages: {[key: string]: string} = {
    [editor.SAVE_FIELD_SUCCESS]: savedSuccessfully('Field'),
    [editor.SAVE_FIELD_FAIL]: couldNotBeSaved('Field'),
    [editor.DELETE_FIELD_SUCCESS]: removedSuccessfully('Field'),
    [editor.DELETE_FIELD_FAIL]: couldNotBeRemoved('Field'),
    [editor.SAVE_MAP_LOCATION_SUCCESS]: savedSuccessfully('Location'),
    [editor.SAVE_MAP_LOCATION_FAIL]: couldNotBeSaved('Location'),
    [editor.SAVE_MAP_PATH_SUCCESS]: savedSuccessfully('Path'),
    [editor.SAVE_MAP_PATH_FAIL]: couldNotBeSaved('Path'),
    [editor.DELETE_MAP_PATH_SUCCESS]: removedSuccessfully('Path'),
    [editor.DELETE_MAP_PATH_FAIL]: couldNotBeRemoved('Path')
};
