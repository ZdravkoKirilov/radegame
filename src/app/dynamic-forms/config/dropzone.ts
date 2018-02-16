import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

export const DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: ' ',
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    autoQueue: false,
    autoProcessQueue: false,
    maxFiles: 1,
};