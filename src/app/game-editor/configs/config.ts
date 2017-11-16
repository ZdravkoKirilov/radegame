import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

export const FEATURE_NAME = 'editor';

export const DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: ' ',
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    autoQueue: false,
    autoProcessQueue: false,
    maxFiles: 1
};

export const FABRIC_CANVAS_CONFIG = (data: { width: number, height: number }) => (
    {
        ...data,
        allowTouchScrolling: true
    }
);

export const KEYCODES = {
    Enter: 13,
    Delete: 46
};

export const DEFAULT_MAP_LOCATION = {
    width: 100, height: 100, top: 10, left: 10
};
