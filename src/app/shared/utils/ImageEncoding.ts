export const removeBase64Marker = (base64_string) => {
    const BASE64_MARKER = ';base64,';
    const base64Index = base64_string.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = base64_string.substring(base64Index);
    return base64;
};

export const base64_to_binary = (dataURI) => {
    const base64 = removeBase64Marker(dataURI);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
};

export const base64_to_blob = (b64Data, contentType?, sliceSize?) => {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    b64Data = removeBase64Marker(b64Data);
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
};

